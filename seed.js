module.exports = (db) => {
  const User = db.user,
        userFilter = db.userFilter,
        Skill = db.skill,
        Category = db.category,
        Job = db.job,
        JobVideo = db.jobVideo

  let seed = {}

  seed.seedAdmin = async function() {
    let hash = "a2fe8a4e24fbb655e4f9f6702cf4c9f29646383c00d0e765050eea943ea401a194063873a4d9dcf04b1e30bbca56eca91d29ec07eeab8f36398a39c484245e2e9bf38bc03b7961ba90f615584967e1eb1b555d5821324419330a0495a3c1581513e60cb23c2fd83051466c95b3ba7e54811c55a2a7003ef23aae184e2a89bb1d0abc8469584d3562ca47e83581dd4a739114e03798343ddcb462f5b4f42c58c2b92ab00489dec730b6d187b72f1ef871a30c3c3e8ccd36ea4fad0c44cced21e9e7d1fdd7ee3c462c99266549acf3aea52963a42ed920e7fb554c20a6ea4d389c24bc32ca4d09f0327e1b048ca31357d49bf57b37854abd11a969f17513773e2d38194f73c8ea8ddc5b7ef080c5b93d6ac18ed37440020c38230ed84cc44778080b1cbf8d208cfc6969597fee6554d7ed440d3da90664d1e83565ce5ac18957f1414eb82814179274226291d37292fc86786e51208eb0bbb97d5c18c62526939fd4edaec127258dd86c3d46a5e4d89821df3505284f4e484ad85751e13fc185748d40a6e1b9a7f837e820861ef11e8f57181b59ae8945d97c4a50cbc92cbb885527cc4432edfb8c5d666d48c2119d3557a95a4de5e21cf11f8511303038148fd2c3f0157cca3064f54c5be0ce0293a23f94ce4e0078d3cfddc58afaafdea7e33e1f61f9c30e67e30f8347ede223cf7928fbad1786d0d472ed1ddfe8f4ae3b3700"
    let salt = "16578b93d0aca34aaa8ef4ea10c03ed25f291714c8cd474a0596a325c8802da7"
    
    await User.create({
      "contactNumber": "+919876543000",
      "hash": hash,
      "salt": salt,
      role: {
        superUser: true,
        screener: false,
        videoEditor: false,
        videoPresenter: false,
        recruiter: false
      }
    })
    await User.create({
      "contactNumber": "+919876543001",
      "hash": hash,
      "salt": salt,
      role: {
        superUser: false,
        screener: false,
        videoEditor: false,
        videoPresenter: false,
        recruiter: true
      }
    })
    await User.create({
      "contactNumber": "+919876543010",
      "hash": hash,
      "salt": salt,
      role: {
        superUser: false,
        screener: true,
        videoEditor: false,
        videoPresenter: false,
        recruiter: false
      }
    })
   
  }

  seed.seedUser = async function() {
    let hash = "a2fe8a4e24fbb655e4f9f6702cf4c9f29646383c00d0e765050eea943ea401a194063873a4d9dcf04b1e30bbca56eca91d29ec07eeab8f36398a39c484245e2e9bf38bc03b7961ba90f615584967e1eb1b555d5821324419330a0495a3c1581513e60cb23c2fd83051466c95b3ba7e54811c55a2a7003ef23aae184e2a89bb1d0abc8469584d3562ca47e83581dd4a739114e03798343ddcb462f5b4f42c58c2b92ab00489dec730b6d187b72f1ef871a30c3c3e8ccd36ea4fad0c44cced21e9e7d1fdd7ee3c462c99266549acf3aea52963a42ed920e7fb554c20a6ea4d389c24bc32ca4d09f0327e1b048ca31357d49bf57b37854abd11a969f17513773e2d38194f73c8ea8ddc5b7ef080c5b93d6ac18ed37440020c38230ed84cc44778080b1cbf8d208cfc6969597fee6554d7ed440d3da90664d1e83565ce5ac18957f1414eb82814179274226291d37292fc86786e51208eb0bbb97d5c18c62526939fd4edaec127258dd86c3d46a5e4d89821df3505284f4e484ad85751e13fc185748d40a6e1b9a7f837e820861ef11e8f57181b59ae8945d97c4a50cbc92cbb885527cc4432edfb8c5d666d48c2119d3557a95a4de5e21cf11f8511303038148fd2c3f0157cca3064f54c5be0ce0293a23f94ce4e0078d3cfddc58afaafdea7e33e1f61f9c30e67e30f8347ede223cf7928fbad1786d0d472ed1ddfe8f4ae3b3700"
    let salt = "16578b93d0aca34aaa8ef4ea10c03ed25f291714c8cd474a0596a325c8802da7"
    let skills= [
      "Dance", "Enjoy", "Live", "Laugh"
    ]
    let educations= [
      {
        "institute":"ABC",
        "course":"CSE",
        "degree":"B.Tech",
        "batchFrom":2020,
        "batchTo":2024
      },
      {
        "institute":"JKL",
        "course":"ECE",
        "degree":"B.Tech",
        "batchFrom":2016,
        "batchTo":2020
      }
    ]
    let certifications= [
      {
        "institute":"ABC",
        "name":"CSE",
        "degree":"B.Tech",
        "batchFrom":2020,
        "batchTo":2024,
        "type":"Study"
      },
      {
        "institute":"JKL",
            "name":"ECE",
            "degree":"B.Tech",
            "batchFrom":2016,
            "batchTo":2020,
            "type":"Study"
      }
    ]
    let professionalDetails= [
      {
        "organization":"ABC",
        "designation":"CT",
        "fromMonth":12,
        "fromYear":2024,
        "toMonth":6,
        "toYear":2026
      },
      {
        "organization":"JKL",
            "designation":"Manager",
            "fromMonth":10,
            "fromYear":2020,
        "toMonth":8,
        "toYear":2028
      }
    ]
    await User.create({
      "contactNumber": "+919876543011",
      "hash": hash,
      "salt": salt,
      firstName: "Anshuman",
      lastName: "Dubey",
      contactNumber: "9876543210",
      dateOfBirth: new Date(),
      gender: "Male",
      resume: "",
      profileImage: "",
      address: {
        latitude: 0,
        longitude: 0,
        city: "Kolkata",
        state: "West Bengal",
        country: "India"
      },
      pincode: "700000",
      city: "Kolkata",
      annualSalary: 0,
      hideSalary: true,
      expectedSalary: 1000000,
      salaryNegotiable: true,
      tagline: "Y do I need to exist?",
      industry: "Human",
      functionalArea: "Brain",
      noticePeriod: "15 days",
      experience: "Nice",
      skills: skills,
      educations: educations,
      certifications: certifications,
      professionalDetails: professionalDetails,
    })
    await User.create({
      "contactNumber": "+919876543100",
      "hash": hash,
      "salt": salt,
      firstName: "Satyam",
      lastName: "Shukla",
      contactNumber: "9876543210",
      dateOfBirth: new Date(),
      gender: "Male",
      resume: "",
      profileImage: "",
      address: {
        latitude: 0,
        longitude: 0,
        city: "Mumbai",
        state: "Maharastra",
        country: "India"
      },
      pincode: "700000",
      city: "Mumbai",
      annualSalary: 0,
      hideSalary: true,
      expectedSalary: 1000000,
      salaryNegotiable: true,
      tagline: "Y do I need to exist?",
      industry: "Human",
      functionalArea: "Brain",
      noticePeriod: "15 days",
      experience: "Nice",
      skills: skills,
      educations: educations,
      certifications: certifications,
      professionalDetails: professionalDetails,
    })
    await User.create({
      "contactNumber": "+919876543101",
      "hash": hash,
      "salt": salt,
      firstName: "Tushar",
      lastName: "Agarwal",
      contactNumber: "9876543210",
      dateOfBirth: new Date(),
      gender: "Male",
      resume: "",
      profileImage: "",
      address: {
        latitude: 0,
        longitude: 0,
        city: "Kolkata",
        state: "West Bengal",
        country: "India"
      },
      pincode: "700000",
      city: "Kolkata",
      annualSalary: 0,
      hideSalary: true,
      expectedSalary: 1000000,
      salaryNegotiable: true,
      tagline: "Y do I need to exist?",
      industry: "Human",
      functionalArea: "Brain",
      noticePeriod: "15 days",
      experience: "Nice",
      skills: skills,
      educations: educations,
      certifications: certifications,
      professionalDetails: professionalDetails,
    })

  }

  seed.seedSkills = async function(){
    let skills = [
      {
        name: "NodeJS",
        category: "Web Development"
      },
      {
        name: "PHP",
        category: "Web Development"
      },
      {
        name: "Firebase",
        category: "Web Development"
      },
      {
        name: "Java",
        category: "Software Development"
      },
      {
        name: "Python",
        category: "Software Development"
      },
    ]
    for(let i = 0; i < skills.length; i++){
      await Skill.create(skills[i])
    }
  }

  seed.seedCategories = async function(){
    let categories = [
      {
        name: "Web Development",
      },
      {
        name: "Software Development",
      },
      {
        name: "App Development",
      },
    ]
    for(let i = 0; i < categories.length; i++){
      await Category.create(categories[i])
    }
  }


  return seed
}