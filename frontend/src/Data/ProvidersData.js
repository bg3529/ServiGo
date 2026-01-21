 const providers = [
  // --- 1. STUDENT HOUSING (SubCategory IDs: 101, 102, 103, 104) ---
  { id: 5001, subCategoryId: 101, name: "Arjun Thapa", rating: 4.8, price: "Rs. 6000/mo", experience: "5yr", isVerified: true, image: "https://i.pinimg.com/564x/cf/21/d1/cf21d1d258d93507bc444a568846bd75.jpg" },
  { id: 5002, subCategoryId: 101, name: "Sunita Rai", rating: 4.7, price: "Rs. 5500/mo", experience: "3yr", isVerified: true, image: "https://i.pinimg.com/564x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg" },
  { id: 5003, subCategoryId: 101, name: "Kabir Jha", rating: 4.5, price: "Rs. 6500/mo", experience: "4yr", isVerified: false, image: "https://i.pinimg.com/564x/e3/7e/0e/e37e0e2561b907347d4e33966029d50a.jpg" },
  { id: 5004, subCategoryId: 101, name: "Nisha Shrestha", rating: 4.9, price: "Rs. 7000/mo", experience: "2yr", isVerified: true, image: "https://i.pinimg.com/564x/2e/2f/ac/2e2fac9d4a392456e511345021592dd2.jpg" },
  { id: 5005, subCategoryId: 101, name: "Ramesh Giri", rating: 4.6, price: "Rs. 5800/mo", experience: "6yr", isVerified: true, image: "https://i.pinimg.com/564x/a9/37/85/a93785713b46417c24a7baee67500acc.jpg" },

  { id: 5006, subCategoryId: 102, name: "Suman Pandey", rating: 4.8, price: "Rs. 15000/mo", experience: "8yr", isVerified: true, image: "https://i.pinimg.com/564x/4d/c5/f2/4dc5f29910e53a57f6b96e4f3f4c66e2.jpg" },
  { id: 5007, subCategoryId: 102, name: "Bishal Shah", rating: 4.4, price: "Rs. 12000/mo", experience: "4yr", isVerified: true, image: "https://i.pinimg.com/564x/cf/21/d1/cf21d1d258d93507bc444a568846bd75.jpg" },
  { id: 5008, subCategoryId: 102, name: "Anjali Tamang", rating: 4.6, price: "Rs. 14000/mo", experience: "2yr", isVerified: false, image: "https://i.pinimg.com/564x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg" },
  { id: 5009, subCategoryId: 102, name: "Pradip Kc", rating: 4.2, price: "Rs. 11000/mo", experience: "3yr", isVerified: true, image: "https://i.pinimg.com/564x/a9/37/85/a93785713b46417c24a7baee67500acc.jpg" },
  { id: 5010, subCategoryId: 102, name: "Sita Wali", rating: 4.9, price: "Rs. 20000/mo", experience: "10yr", isVerified: true, image: "https://i.pinimg.com/564x/2e/2f/ac/2e2fac9d4a392456e511345021592dd2.jpg" },

  { id: 5011, subCategoryId: 103, name: "Gopal Magar", rating: 4.5, price: "Rs. 8000/mo", experience: "6yr", isVerified: true, image: "https://i.pinimg.com/564x/4d/c5/f2/4dc5f29910e53a57f6b96e4f3f4c66e2.jpg" },
  { id: 5012, subCategoryId: 103, name: "Kusum Shrestha", rating: 4.7, price: "Rs. 9500/mo", experience: "4yr", isVerified: true, image: "https://i.pinimg.com/564x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg" },
  { id: 5013, subCategoryId: 103, name: "Manoj Chaudhary", rating: 4.3, price: "Rs. 7500/mo", experience: "5yr", isVerified: false, image: "https://i.pinimg.com/564x/cf/21/d1/cf21d1d258d93507bc444a568846bd75.jpg" },
  { id: 5014, subCategoryId: 103, name: "Urmila Devi", rating: 4.6, price: "Rs. 8500/mo", experience: "12yr", isVerified: true, image: "https://i.pinimg.com/564x/2e/2f/ac/2e2fac9d4a392456e511345021592dd2.jpg" },
  { id: 5015, subCategoryId: 103, name: "Ram Chandra", rating: 4.8, price: "Rs. 10000/mo", experience: "15yr", isVerified: true, image: "https://i.pinimg.com/564x/a9/37/85/a93785713b46417c24a7baee67500acc.jpg" },

  { id: 5016, subCategoryId: 104, name: "Dinesh Lama", rating: 4.2, price: "Consultation", experience: "1yr", isVerified: false, image: "https://i.pinimg.com/564x/4d/c5/f2/4dc5f29910e53a57f6b96e4f3f4c66e2.jpg" },
  { id: 5017, subCategoryId: 104, name: "Sarita Gurung", rating: 4.9, price: "Consultation", experience: "3yr", isVerified: true, image: "https://i.pinimg.com/564x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg" },
  { id: 5018, subCategoryId: 104, name: "Amit Bikram", rating: 4.4, price: "Consultation", experience: "2yr", isVerified: true, image: "https://i.pinimg.com/564x/cf/21/d1/cf21d1d258d93507bc444a568846bd75.jpg" },
  { id: 5019, subCategoryId: 104, name: "Deepak Raj", rating: 4.1, price: "Consultation", experience: "5yr", isVerified: false, image: "https://i.pinimg.com/564x/a9/37/85/a93785713b46417c24a7baee67500acc.jpg" },
  { id: 5020, subCategoryId: 104, name: "Pooja Hegde", rating: 4.6, price: "Consultation", experience: "4yr", isVerified: true, image: "https://i.pinimg.com/564x/2e/2f/ac/2e2fac9d4a392456e511345021592dd2.jpg" },

  // --- 2. TUTORING (SubCategory IDs: 201, 202, 203, 204) ---
  { id: 5021, subCategoryId: 201, name: "Dr. Sandeep Adhikari", rating: 4.9, price: "Rs. 1000/hr", experience: "10yr", isVerified: true, image: "https://i.pinimg.com/564x/4d/c5/f2/4dc5f29910e53a57f6b96e4f3f4c66e2.jpg" },
  { id: 5022, subCategoryId: 201, name: "Prof. Binita Karki", rating: 4.8, price: "Rs. 800/hr", experience: "15yr", isVerified: true, image: "https://i.pinimg.com/564x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg" },
  { id: 5023, subCategoryId: 201, name: "Anish Giri", rating: 4.6, price: "Rs. 500/hr", experience: "3yr", isVerified: true, image: "https://i.pinimg.com/564x/cf/21/d1/cf21d1d258d93507bc444a568846bd75.jpg" },
  { id: 5024, subCategoryId: 201, name: "Sushma Swaraj", rating: 4.7, price: "Rs. 700/hr", experience: "5yr", isVerified: false, image: "https://i.pinimg.com/564x/2e/2f/ac/2e2fac9d4a392456e511345021592dd2.jpg" },
  { id: 5025, subCategoryId: 201, name: "Bibek Poudel", rating: 4.5, price: "Rs. 600/hr", experience: "4yr", isVerified: true, image: "https://i.pinimg.com/564x/a9/37/85/a93785713b46417c24a7baee67500acc.jpg" },

  // --- 8. HOME IMPROVEMENT (SubCategory IDs: 801, 802, 803, 804) ---
  { id: 5141, subCategoryId: 801, name: "Ram Sewak", rating: 4.8, price: "Rs. 2500", experience: "5yr", isVerified: true, image: "https://i.pinimg.com/564x/cf/21/d1/cf21d1d258d93507bc444a568846bd75.jpg" },
  { id: 5142, subCategoryId: 801, name: "Shyam Sundar", rating: 4.6, price: "Rs. 2000", experience: "3yr", isVerified: true, image: "https://i.pinimg.com/564x/a9/37/85/a93785713b46417c24a7baee67500acc.jpg" },
  { id: 5143, subCategoryId: 801, name: "Krishna Cleaning", rating: 4.7, price: "Rs. 3000", experience: "7yr", isVerified: true, image: "https://i.pinimg.com/564x/4d/c5/f2/4dc5f29910e53a57f6b96e4f3f4c66e2.jpg" },
  { id: 5144, subCategoryId: 801, name: "Maya Pariyar", rating: 4.5, price: "Rs. 1800", experience: "2yr", isVerified: false, image: "https://i.pinimg.com/564x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg" },
  { id: 5145, subCategoryId: 801, name: "Bharat Shrestha", rating: 4.4, price: "Rs. 2200", experience: "4yr", isVerified: true, image: "https://i.pinimg.com/564x/2e/2f/ac/2e2fac9d4a392456e511345021592dd2.jpg" },

  { id: 5146, subCategoryId: 802, name: "Kancha Plumber", rating: 4.9, price: "Rs. 500/hr", experience: "20yr", isVerified: true, image: "https://i.pinimg.com/564x/cf/21/d1/cf21d1d258d93507bc444a568846bd75.jpg" },
  { id: 5147, subCategoryId: 802, name: "Som Nath", rating: 4.3, price: "Rs. 400/hr", experience: "5yr", isVerified: true, image: "https://i.pinimg.com/564x/a9/37/85/a93785713b46417c24a7baee67500acc.jpg" },
  { id: 5148, subCategoryId: 802, name: "Raju Shrestha", rating: 4.5, price: "Rs. 600/hr", experience: "8yr", isVerified: true, image: "https://i.pinimg.com/564x/4d/c5/f2/4dc5f29910e53a57f6b96e4f3f4c66e2.jpg" },
  { id: 5149, subCategoryId: 802, name: "Bhimsen Rana", rating: 4.1, price: "Rs. 350/hr", experience: "2yr", isVerified: false, image: "https://i.pinimg.com/564x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg" },
  { id: 5150, subCategoryId: 802, name: "Ishwor Lal", rating: 4.7, price: "Rs. 700/hr", experience: "10yr", isVerified: true, image: "https://i.pinimg.com/564x/2e/2f/ac/2e2fac9d4a392456e511345021592dd2.jpg" },

  // --- 9. FOOD & MEAL (SubCategory IDs: 901, 902, 903, 904) ---
  { id: 5161, subCategoryId: 901, name: "Sushila Kitchen", rating: 4.9, price: "Rs. 150/meal", experience: "10yr", isVerified: true, image: "https://i.pinimg.com/564x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg" },
  { id: 5162, subCategoryId: 901, name: "Mitho Tiffin", rating: 4.6, price: "Rs. 120/meal", experience: "4yr", isVerified: true, image: "https://i.pinimg.com/564x/cf/21/d1/cf21d1d258d93507bc444a568846bd75.jpg" },
  { id: 5163, subCategoryId: 901, name: "Annapurna Food", rating: 4.7, price: "Rs. 180/meal", experience: "15yr", isVerified: true, image: "https://i.pinimg.com/564x/a9/37/85/a93785713b46417c24a7baee67500acc.jpg" },
  { id: 5164, subCategoryId: 901, name: "Ghar ko Khana", rating: 4.5, price: "Rs. 140/meal", experience: "5yr", isVerified: false, image: "https://i.pinimg.com/564x/2e/2f/ac/2e2fac9d4a392456e511345021592dd2.jpg" },
  { id: 5165, subCategoryId: 901, name: "Rajani Bhojan", rating: 4.8, price: "Rs. 200/meal", experience: "8yr", isVerified: true, image: "https://i.pinimg.com/564x/4d/c5/f2/4dc5f29910e53a57f6b96e4f3f4c66e2.jpg" },
 
  // --- 3. PET CARE (SubCategory IDs: 301, 302, 303, 304) ---
  { id: 5031, subCategoryId: 301, name: "Suman Paws", rating: 4.9, price: "Rs. 1500", experience: "5yr", isVerified: true, image: "https://i.pinimg.com/564x/cf/21/d1/cf21d1d258d93507bc444a568846bd75.jpg" },
  { id: 5032, subCategoryId: 301, name: "Pratima Dog Salon", rating: 4.7, price: "Rs. 1200", experience: "3yr", isVerified: true, image: "https://i.pinimg.com/564x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg" },
  { id: 5033, subCategoryId: 301, name: "Brijesh Pet Groomer", rating: 4.5, price: "Rs. 1000", experience: "4yr", isVerified: false, image: "https://i.pinimg.com/564x/a9/37/85/a93785713b46417c24a7baee67500acc.jpg" },
  { id: 5034, subCategoryId: 301, name: "Kushal Bark", rating: 4.8, price: "Rs. 2000", experience: "6yr", isVerified: true, image: "https://i.pinimg.com/564x/2e/2f/ac/2e2fac9d4a392456e511345021592dd2.jpg" },
  { id: 5035, subCategoryId: 301, name: "Anu Pet Care", rating: 4.6, price: "Rs. 1100", experience: "2yr", isVerified: true, image: "https://i.pinimg.com/564x/4d/c5/f2/4dc5f29910e53a57f6b96e4f3f4c66e2.jpg" },

  { id: 5036, subCategoryId: 302, name: "Rajesh Walker", rating: 4.9, price: "Rs. 300/hr", experience: "4yr", isVerified: true, image: "https://i.pinimg.com/564x/cf/21/d1/cf21d1d258d93507bc444a568846bd75.jpg" },
  { id: 5037, subCategoryId: 302, name: "Mina Paw-walker", rating: 4.6, price: "Rs. 250/hr", experience: "2yr", isVerified: true, image: "https://i.pinimg.com/564x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg" },
  { id: 5038, subCategoryId: 302, name: "Suresh Dog Friend", rating: 4.4, price: "Rs. 200/hr", experience: "1yr", isVerified: false, image: "https://i.pinimg.com/564x/a9/37/85/a93785713b46417c24a7baee67500acc.jpg" },
  { id: 5039, subCategoryId: 302, name: "Dipen Shrestha", rating: 4.7, price: "Rs. 350/hr", experience: "5yr", isVerified: true, image: "https://i.pinimg.com/564x/2e/2f/ac/2e2fac9d4a392456e511345021592dd2.jpg" },
  { id: 5040, subCategoryId: 302, name: "Bimala Tamang", rating: 4.5, price: "Rs. 280/hr", experience: "3yr", isVerified: true, image: "https://i.pinimg.com/564x/4d/c5/f2/4dc5f29910e53a57f6b96e4f3f4c66e2.jpg" },

  // --- 4. HEALTH & WELLNESS (SubCategory IDs: 401, 402, 403, 404) ---
  { id: 5051, subCategoryId: 401, name: "Dr. Bikash (Physio)", rating: 4.9, price: "Rs. 1200", experience: "8yr", isVerified: true, image: "https://i.pinimg.com/564x/cf/21/d1/cf21d1d258d93507bc444a568846bd75.jpg" },
  { id: 5052, subCategoryId: 401, name: "Physio Neeta", rating: 4.7, price: "Rs. 1000", experience: "5yr", isVerified: true, image: "https://i.pinimg.com/564x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg" },
  { id: 5053, subCategoryId: 401, name: "Kiran Rehab", rating: 4.5, price: "Rs. 900", experience: "4yr", isVerified: true, image: "https://i.pinimg.com/564x/a9/37/85/a93785713b46417c24a7baee67500acc.jpg" },
  { id: 5054, subCategoryId: 401, name: "Suman Therapy", rating: 4.4, price: "Rs. 1100", experience: "6yr", isVerified: false, image: "https://i.pinimg.com/564x/2e/2f/ac/2e2fac9d4a392456e511345021592dd2.jpg" },
  { id: 5055, subCategoryId: 401, name: "Anita Health", rating: 4.8, price: "Rs. 1500", experience: "10yr", isVerified: true, image: "https://i.pinimg.com/564x/4d/c5/f2/4dc5f29910e53a57f6b96e4f3f4c66e2.jpg" },

  // --- 5. TECH SERVICES (SubCategory IDs: 501, 502, 503, 504) ---
  { id: 5071, subCategoryId: 501, name: "Ramesh Tech Fix", rating: 4.9, price: "Rs. 500+", experience: "12yr", isVerified: true, image: "https://i.pinimg.com/564x/cf/21/d1/cf21d1d258d93507bc444a568846bd75.jpg" },
  { id: 5072, subCategoryId: 501, name: "Sabin Laptop Hub", rating: 4.7, price: "Rs. 400+", experience: "5yr", isVerified: true, image: "https://i.pinimg.com/564x/a9/37/85/a93785713b46417c24a7baee67500acc.jpg" },
  { id: 5073, subCategoryId: 501, name: "Prakash Software", rating: 4.4, price: "Rs. 300+", experience: "3yr", isVerified: false, image: "https://i.pinimg.com/564x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg" },
  { id: 5074, subCategoryId: 501, name: "Computer Sujan", rating: 4.6, price: "Rs. 600+", experience: "8yr", isVerified: true, image: "https://i.pinimg.com/564x/2e/2f/ac/2e2fac9d4a392456e511345021592dd2.jpg" },
  { id: 5075, subCategoryId: 501, name: "Madan Repair", rating: 4.5, price: "Rs. 450+", experience: "6yr", isVerified: true, image: "https://i.pinimg.com/564x/4d/c5/f2/4dc5f29910e53a57f6b96e4f3f4c66e2.jpg" },

  // --- 6. AUTOMOBILES (SubCategory IDs: 601, 602, 603, 604) ---
  { id: 5091, subCategoryId: 601, name: "Bikki Bike Center", rating: 4.8, price: "Rs. 800", experience: "10yr", isVerified: true, image: "https://i.pinimg.com/564x/cf/21/d1/cf21d1d258d93507bc444a568846bd75.jpg" },
  { id: 5092, subCategoryId: 601, name: "Suresh Mechanics", rating: 4.6, price: "Rs. 700", experience: "7yr", isVerified: true, image: "https://i.pinimg.com/564x/a9/37/85/a93785713b46417c24a7baee67500acc.jpg" },
  { id: 5093, subCategoryId: 601, name: "Lama Workshop", rating: 4.3, price: "Rs. 600", experience: "4yr", isVerified: false, image: "https://i.pinimg.com/564x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg" },
  { id: 5094, subCategoryId: 601, name: "Raju Auto Works", rating: 4.7, price: "Rs. 900", experience: "9yr", isVerified: true, image: "https://i.pinimg.com/564x/2e/2f/ac/2e2fac9d4a392456e511345021592dd2.jpg" },
  { id: 5095, subCategoryId: 601, name: "Goma Moto", rating: 4.5, price: "Rs. 750", experience: "3yr", isVerified: true, image: "https://i.pinimg.com/564x/4d/c5/f2/4dc5f29910e53a57f6b96e4f3f4c66e2.jpg" },

  // --- 7. PERSONAL SERVICES (SubCategory IDs: 701, 702, 703, 704) ---
  { id: 5111, subCategoryId: 701, name: "Kundan Barber", rating: 4.9, price: "Rs. 300", experience: "15yr", isVerified: true, image: "https://i.pinimg.com/564x/cf/21/d1/cf21d1d258d93507bc444a568846bd75.jpg" },
  { id: 5112, subCategoryId: 701, name: "Sunil Salon", rating: 4.7, price: "Rs. 250", experience: "8yr", isVerified: true, image: "https://i.pinimg.com/564x/a9/37/85/a93785713b46417c24a7baee67500acc.jpg" },
  { id: 5113, subCategoryId: 701, name: "Roshan Cuts", rating: 4.4, price: "Rs. 200", experience: "5yr", isVerified: false, image: "https://i.pinimg.com/564x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg" },
  { id: 5114, subCategoryId: 701, name: "Bijay Hairstylist", rating: 4.6, price: "Rs. 400", experience: "6yr", isVerified: true, image: "https://i.pinimg.com/564x/2e/2f/ac/2e2fac9d4a392456e511345021592dd2.jpg" },
  { id: 5115, subCategoryId: 701, name: "Arpan Unisex Salon", rating: 4.5, price: "Rs. 350", experience: "4yr", isVerified: true, image: "https://i.pinimg.com/564x/4d/c5/f2/4dc5f29910e53a57f6b96e4f3f4c66e2.jpg" }

];

export default providers;