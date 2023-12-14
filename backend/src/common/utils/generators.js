function generateUsername() {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let username = "";
  for (let i = 0; i < 10; i++) {
    username += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  username += Math.floor(Math.random() * 1000);
  return username;
}

function generateName() {
  const firstNames = [
    "John",
    "Jane",
    "Michael",
    "Emily",
    "William",
    "Olivia",
    "Sophia",
    "Daniel",
    "Ethan",
    "Emma",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Brown",
    "Garcia",
    "Davis",
    "Wilson",
    "Lee",
    "Gonzalez",
    "Clark",
    "Rodriguez",
  ];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
}

function generateDateOfBirth() {
  const year = 2020 - Math.floor(Math.random() * 100);
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  return `${year}-${month}-${day}`;
}

function generateHourlyRate() {
  return Math.floor(Math.random() * 100) + 1;
}

function generateAffiliation() {
  const affiliations = ["Hospital", "Clinic", "Medical Center", "Practice"];
  const affiliation =
    affiliations[Math.floor(Math.random() * affiliations.length)];
  const suffixes = ["of", "for", "at"];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Philadelphia",
    "Phoenix",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
  ];
  const city = cities[Math.floor(Math.random() * cities.length)];
  return `${affiliation} ${suffix} ${city}`;
}

function generateEducationalBackground() {
  const degrees = [
    "MD",
    "DO",
    "MBBS",
    "MBChB",
    "BMBS",
    "BMED",
    "MB",
    "BCh",
    "BMed",
    "MDCM",
    "MUDr",
    "Dr. med.",
    "Lekarz",
    "Medicinsk Examen",
    "Medicinsk Kandidat",
    "Medicinsk Licentiat",
    "Medicinsk Doktor",
    "Medicinae Universae Doctor",
    "Doctor of Medicine",
  ];
  const degree = degrees[Math.floor(Math.random() * degrees.length)];
  const schools = [
    "Harvard Medical School",
    "Johns Hopkins School of Medicine",
    "Stanford University School of Medicine",
    "Perelman School of Medicine at the University of Pennsylvania",
    "David Geffen School of Medicine at UCLA",
    "UCSF School of Medicine",
    "Washington University School of Medicine in St. Louis",
    "Mayo Clinic Alix School of Medicine",
    "Duke University School of Medicine",
    "University of Michigan Medical School",
  ];
  const school = schools[Math.floor(Math.random() * schools.length)];
  const years = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];
  const year = years[Math.floor(Math.random() * years.length)];
  return `${degree} from ${school} (${year})`;
}

function generateSpeciality() {
  const specialties = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Hematology",
    "Infectious Disease",
    "Nephrology",
    "Neurology",
    "Oncology",
    "Ophthalmology",
    "Orthopedics",
    "Otolaryngology",
    "Pediatrics",
    "Psychiatry",
    "Pulmonology",
    "Radiology",
    "Rheumatology",
    "Urology",
  ];
  return specialties[Math.floor(Math.random() * specialties.length)];
}

function generateMobileNum() {
  const mobileNum = Math.floor(Math.random() * 1000000000) + 1000000000;
  return mobileNum;
}

function generatePackage() {
  const packages = ["Silver", "Gold", "Platinum"];
  return packages[Math.floor(Math.random() * packages.length)];
}

function generateEmail() {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let email = "";
  for (let i = 0; i < 10; i++) {
    email += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  email += Math.floor(Math.random() * 1000);
  email += "@gmail.com";
  return email;
}

function generatePassword() {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let password = "";
  for (let i = 0; i < 10; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  password += Math.floor(Math.random() * 1000);
  return password;
}

function generateMedicineDetails() {
  const medicines = [
    {
      name: "Aspirin",
      quantity: Math.floor(Math.random() * 100),
      activeIngredients: ["Acetylsalicylic acid"],
      description:
        "Aspirin is a nonsteroidal anti-inflammatory drug (NSAID) used to treat fever, pain, and inflammation.",
      price: Math.floor(Math.random() * 1000),
      medicinalUse: ["painkiller", "fever", "anti-inflammatory"],
      sales: Math.floor(Math.random() * 1000),
      medicationType: "Over the counter",
    },
    {
      name: "Paracetamol",
      quantity: Math.floor(Math.random() * 100),
      activeIngredients: ["Paracetamol"],
      description: "Paracetamol is a pain reliever and a fever reducer.",
      price: Math.floor(Math.random() * 1000),
      medicinalUse: ["painkiller", "fever"],
      sales: Math.floor(Math.random() * 1000),
      medicationType: "Over the counter",
    },
    {
      name: "Ibuprofen",
      quantity: Math.floor(Math.random() * 100),
      activeIngredients: ["Ibuprofen"],
      description:
        "Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used to treat pain, fever, and inflammation.",
      price: Math.floor(Math.random() * 1000),
      medicinalUse: ["painkiller", "fever", "anti-inflammatory"],
      sales: Math.floor(Math.random() * 1000),
      medicationType: "Over the counter",
    },
    {
      name: "Acetaminophen",
      quantity: Math.floor(Math.random() * 100),
      activeIngredients: ["Acetaminophen"],
      description: "Acetaminophen is a pain reliever and a fever reducer.",
      price: Math.floor(Math.random() * 1000),
      medicinalUse: ["painkiller", "fever"],
      sales: Math.floor(Math.random() * 1000),
      medicationType: "Over the counter",
    },
    {
      name: "Naproxen",
      quantity: Math.floor(Math.random() * 100),
      activeIngredients: ["Naproxen"],
      description:
        "Naproxen is a nonsteroidal anti-inflammatory drug (NSAID) used to treat pain, fever, and inflammation.",
      price: Math.floor(Math.random() * 1000),
      medicinalUse: ["painkiller", "fever", "anti-inflammatory"],
      sales: Math.floor(Math.random() * 1000),
      medicationType: "Over the counter",
    },
    {
      name: "Codeine",
      quantity: Math.floor(Math.random() * 100),
      activeIngredients: ["Codeine"],
      description:
        "Codeine is an opioid pain medication used to treat mild to moderate pain.",
      price: Math.floor(Math.random() * 1000),
      medicinalUse: ["painkiller", "pain"],
      sales: Math.floor(Math.random() * 1000),
      medicationType: "Prescribed",
    },
    {
      name: "Morphine",
      quantity: Math.floor(Math.random() * 100),
      activeIngredients: ["Morphine"],
      description:
        "Morphine is an opioid pain medication used to treat severe pain.",
      price: Math.floor(Math.random() * 1000),
      medicinalUse: ["painkiller", "pain"],
      sales: Math.floor(Math.random() * 1000),
      medicationType: "Prescribed",
    },
    {
      name: "Tramadol",
      quantity: Math.floor(Math.random() * 100),
      activeIngredients: ["Tramadol"],
      description:
        "Tramadol is an opioid pain medication used to treat moderate to severe pain.",
      price: Math.floor(Math.random() * 1000),
      medicinalUse: ["painkiller", "pain"],
      sales: Math.floor(Math.random() * 1000),
      medicationType: "Prescribed",
    },
    {
      name: "Diazepam",
      quantity: Math.floor(Math.random() * 100),
      activeIngredients: ["Diazepam"],
      description:
        "Diazepam is a benzodiazepine used to treat anxiety, alcohol withdrawal, and seizures.",
      price: Math.floor(Math.random() * 1000),
      medicinalUse: ["anxiety"],
      sales: Math.floor(Math.random() * 1000),
      medicationType: "Prescribed",
    },
    {
      name: "Lorazepam",
      quantity: Math.floor(Math.random() * 100),
      activeIngredients: ["Lorazepam"],
      description:
        "Lorazepam is a benzodiazepine used to treat anxiety, insomnia, and seizures.",
      price: Math.floor(Math.random() * 1000),
      medicinalUse: ["anxiety", "pain"],
      sales: Math.floor(Math.random() * 1000),
      medicationType: "Prescribed",
    },
    {
      name: "Alprazolam",
      quantity: Math.floor(Math.random() * 100),
      activeIngredients: ["Alprazolam"],
      description:
        "Alprazolam is a benzodiazepine used to treat anxiety and panic disorders.",
      price: Math.floor(Math.random() * 1000),
      medicinalUse: ["anxiety"],
      sales: Math.floor(Math.random() * 1000),
      medicationType: "Prescribed",
    },
    {
      name: "Cetirizine",
      quantity: Math.floor(Math.random() * 100),
      activeIngredients: ["Cetirizine"],
      description:
        "Cetirizine is an antihistamine used to treat allergies and hives.",
      price: Math.floor(Math.random() * 1000),
      medicinalUse: ["fever"],
      sales: Math.floor(Math.random() * 1000),
      medicationType: "Over the counter",
    },
    {
      name: "Loratadine",
      quantity: Math.floor(Math.random() * 100),
      activeIngredients: ["Loratadine"],
      description: "Loratadine is an antihistamine used to treat allergies.",
      price: Math.floor(Math.random() * 1000),
      medicinalUse: ["fever"],
      sales: Math.floor(Math.random() * 1000),
      medicationType: "Over the counter",
    },
    {
      name: "Fexofenadine",
      quantity: Math.floor(Math.random() * 100),
      activeIngredients: ["Fexofenadine"],
      description: "Fexofenadine is an antihistamine used to treat allergies.",
      price: Math.floor(Math.random() * 1000),
      medicinalUse: ["fever"],
      sales: Math.floor(Math.random() * 1000),
      medicationType: "Over the counter",
    },
    {
      name: "Omeprazole",
      quantity: Math.floor(Math.random() * 100),
      activeIngredients: ["Omeprazole"],
      description:
        "Omeprazole is a proton pump inhibitor used to treat gastroesophageal reflux disease (GERD) and stomach ulcers.",
      price: Math.floor(Math.random() * 1000),
      medicinalUse: ["painkiller"],
      sales: Math.floor(Math.random() * 1000),
      medicationType: "Over the counter",
    },
    {
      name: "Pantoprazole",
      quantity: Math.floor(Math.random() * 100),
      activeIngredients: ["Pantoprazole"],
      description:
        "Pantoprazole is a proton pump inhibitor used to treat gastroesophageal reflux disease (GERD) and stomach ulcers.",
      price: Math.floor(Math.random() * 1000),
      medicinalUse: ["painkiller"],
      sales: Math.floor(Math.random() * 1000),
      medicationType: "Over the counter",
    },
    {
      name: "Esomeprazole",
      quantity: Math.floor(Math.random() * 100),
      activeIngredients: ["Esomeprazole"],
      description:
        "Esomeprazole is a proton pump inhibitor used to treat gastroesophageal reflux disease (GERD) and stomach ulcers.",
      price: Math.floor(Math.random() * 1000),
      medicinalUse: ["painkiller"],
      sales: Math.floor(Math.random() * 1000),
      medicationType: "Over the counter",
    },
  ];
  return medicines[Math.floor(Math.random() * medicines.length)];
}

function generateGender() {
  const genders = ["M", "F"];
  return genders[Math.floor(Math.random() * genders.length)];
}

module.exports = {
  generateUsername,
  generateName,
  generateDateOfBirth,
  generateHourlyRate,
  generateAffiliation,
  generateEducationalBackground,
  generateSpeciality,
  generateMobileNum,
  generatePackage,
  generateEmail,
  generatePassword,
  generateMedicineDetails,
  generateGender,
};
