from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from profilebackend.models import UserProfile

User = get_user_model()

class UserProfileAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpassword123'
        )
        self.profile = UserProfile.objects.create(
            user=self.user,
            full_name='Test User',
            phone='1234567890',
            address='Test Address'
        )
        self.url = reverse('profile-detail')

    def test_get_profile_authenticated(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['full_name'], 'Test User')

    def test_get_profile_unauthenticated(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_profile_authenticated(self):
        self.client.force_authenticate(user=self.user)
        data = {
            'full_name': 'Updated Name',
            'phone': '0987654321'
        }
        response = self.client.patch(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['full_name'], 'Updated Name')
        self.assertEqual(response.data['phone'], '0987654321')
        
        # Verify in DB
        self.profile.refresh_from_db()
        self.assertEqual(self.profile.full_name, 'Updated Name')

    def test_get_profile_creates_if_missing(self):
        new_user = User.objects.create_user(
            username='newuser',
            email='new@example.com',
            password='testpassword123'
        )
        self.client.force_authenticate(user=new_user)
        # Profile should not exist yet
        self.assertFalse(UserProfile.objects.filter(user=new_user).exists())
        
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Profile should now exist
        self.assertTrue(UserProfile.objects.filter(user=new_user).exists())

    def test_update_profile_duplicate_email(self):
        # Create another user
        User.objects.create_user(
            username='otheruser',
            email='other@example.com',
            password='testpassword123'
        )
        self.client.force_authenticate(user=self.user)
        # Try to use otheruser's email
        data = {'email': 'other@example.com'}
        response = self.client.patch(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)

    def test_update_profile_invalid_data(self):
        self.client.force_authenticate(user=self.user)
        # Empty name
        data = {'full_name': ''}
        response = self.client.patch(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('full_name', response.data)
        
        # Phone with no digits
        data = {'phone': 'abc'}
        response = self.client.patch(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('phone', response.data)

    def test_update_profile_username(self):
        self.client.force_authenticate(user=self.user)
        # Try to update username
        data = {'username': 'newusername'}
        response = self.client.patch(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], 'newusername')
        
        # Verify in DB
        self.user.refresh_from_db()
        self.assertEqual(self.user.username, 'newusername')
