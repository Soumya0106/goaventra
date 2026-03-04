import { allPackages } from "./packages";
import {
  packageTitleToSlug,
  stripPackageTitleSuffix,
} from "./packageRouting";

export interface PackageItineraryItem {
  day: string;
  title: string;
  description: string;
}

export interface PackageFaq {
  question: string;
  answer: string;
}

export interface PackageDetailsContent {
  slug: string;
  travelStyles: string[];
  facilities: string[];
  minAge: string;
  pickup: string;
  bestSeason: string;
  pricingOptions?: Array<{
    label: string;
    originalPrice?: string;
    price: string;
  }>;
  highlights: string[];
  includes: string[];
  excludes: string[];
  itinerary: PackageItineraryItem[];
  faqs: PackageFaq[];
}

const defaultFaqs: PackageFaq[] = [
  {
    question: "When and where does the tour start?",
    answer:
      "The trip starts from the pickup point mentioned in your booking confirmation. Our team shares exact timing 24-48 hours before departure.",
  },
  {
    question: "Can I customize this package?",
    answer:
      "Yes. Private departures, hotel upgrades, and activity add-ons can be arranged based on availability.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Cancellation terms depend on travel date and supplier policies. Exact rules are shared in your booking confirmation.",
  },
  {
    question: "Is this package suitable for families?",
    answer:
      "Yes, most of our packages are family-friendly. Please review minimum age and activity level before booking.",
  },
];

const detailsBySlug: Record<
  string,
  Omit<PackageDetailsContent, "slug">
> = {
  "chardham-yatra": {
    travelStyles: [
      "Spiritual",
      "Pilgrimage",
      "Helicopter Tour",
      "Premium",
    ],
    facilities: [
      "Helicopter Transfers",
      "VIP Darshan",
      "All Meals at Dhams",
      "Dedicated Tour Escort",
    ],
    minAge: "12+",
    pickup: "Dehradun Airport / Railway Station",
    bestSeason: "April to June",
    highlights: [
      "Route covers Yamunotri, Gangotri, Kedarnath, and Badrinath",
      "Best rate offered: INR 2,40,000 per person (all inclusive)",
      "Priority/VIP darshan at all four shrines",
      "Complimentary Dehradun arrival-night stay with breakfast and dinner",
      "Palki/Pony at Yamunotri and shuttle helicopter tickets for Kedarnath",
    ],
    includes: [
      "Helicopter flying charges ex-Dehradun",
      "Complimentary arrival-night stay at Dehradun on MAP plan (breakfast and dinner)",
      "Airport/railway station-hotel-helipad transfers",
      "Local ground transfers at each Dham",
      "4 nights hotel accommodation at Dhams on APAI plan (all meals included)",
      "Palki/Pony service at Yamunotri",
      "Shri Kedarnath Ji shuttle helicopter tickets",
      "Priority/VIP darshan at all four temples",
      "Uttarakhand government royalties, landing, and parking charges",
      "Helicopter handling charges",
      "Dedicated company escort throughout the journey",
    ],
    excludes: [
      "Maha Abhishek Puja or any special puja charges",
      "Personal expenses and travel insurance",
      "Additional hotel night in Dehradun (if required)",
      "Anything not explicitly listed in inclusions",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Dehradun Arrival and Briefing",
        description:
          "Arrival in Dehradun and transfer to hotel (approx. 1.5 hours). Complimentary stay, evening tour briefing, duffel-bag handover, and rest before departure.",
      },
      {
        day: "Day 2",
        title: "Yamunotri (Kharsali)",
        description:
          "Transfer to Sahastradhara helidrome, fly to Kharsali, and check in at nearby resort. Continue to Yamunotri by 6 km trek with Palki/Pony support, then return to hotel for meals and overnight stay.",
      },
      {
        day: "Day 3",
        title: "Gangotri (Harsil)",
        description:
          "Helicopter transfer from Kharsali to Harsil. Road transfer (22 km) to Gangotri Temple for VIP darshan, then return to Harsil hotel for lunch, leisure, and overnight stay.",
      },
      {
        day: "Day 4",
        title: "Shri Kedarnath Ji",
        description:
          "Fly from Harsil to Sersi/Guptkashi, change helicopter, and board shuttle service to Kedarnath. Darshan at temple (helipad to temple approx. 650 meters), then return to Sersi/Guptkashi for overnight stay.",
      },
      {
        day: "Day 5",
        title: "Shri Badrinath Ji",
        description:
          "Fly from Sersi/Guptkashi to Badrinath, check in, and complete local sightseeing. VIP darshan is arranged in afternoon/evening; all meals served at hotel.",
      },
      {
        day: "Day 6",
        title: "Badrinath to Dehradun Return",
        description:
          "Breakfast and flight to Sahastradhara helidrome. Transfer to Dehradun hotel for luggage collection, then drop to airport/railway station. Tour concludes.",
      },
    ],
    faqs: [
      {
        question: "What is the package cost for Chardham by helicopter?",
        answer:
          "The quoted package price is INR 2,40,000 per person on all-inclusive basis, subject to operator and departure availability.",
      },
      {
        question: "Is this 4 nights/5 days or 5 nights/6 days?",
        answer:
          "The package is sold as 4 nights/5 days at Dhams, with a complimentary Dehradun arrival stay and return logistics that make the operational flow 6 travel days.",
      },
      {
        question: "From where does the helicopter journey start?",
        answer:
          "Helicopter operations start from Sahastradhara helidrome in Dehradun. Airport/railway station transfers are included.",
      },
      {
        question: "Can we carry normal luggage in helicopters?",
        answer:
          "No. Guests are advised to shift essentials to the provided duffel bags. Main luggage stays at Dehradun hotel and is returned after the yatra.",
      },
    ],
  },
  "chardham-yatra-by-helicopter-may-june-2026": {
    travelStyles: ["Spiritual", "Pilgrimage", "Helicopter Tour", "Premium"],
    facilities: ["Helicopter Transfers", "VIP Darshan", "All Meals", "Dedicated Escort"],
    minAge: "12+",
    pickup: "Dehradun Airport / Railway Station",
    bestSeason: "May to June",
    highlights: [
      "Duration: 4 Nights / 5 Days (operational flow: 5 Nights / 6 Days)",
      "Route: Yamunotri - Gangotri - Kedarnath - Badrinath",
      "Best Rate Offered: INR 2,40,000 per person (all inclusive)",
      "Reliable, transparent, and end-to-end assisted Chardham experience",
    ],
    includes: [
      "Helicopter flying charges ex-Dehradun",
      "Complimentary arrival night stay at Dehradun on MAP plan (breakfast and dinner)",
      "Airport / Railway Station - Hotel - Helipad transfers",
      "Local ground transfers at each Dham",
      "Hotel accommodation for 4 nights at Dhams on APAI plan (all meals)",
      "Palki/Pony service at Yamunotri",
      "Shri Kedarnath Ji shuttle helicopter tickets",
      "Priority / VIP darshan at all four temples",
      "Uttarakhand government royalties, landing and parking charges",
      "Helicopter handling charges",
      "Dedicated company escort throughout the journey",
    ],
    excludes: [
      "Maha Abhishek Puja (additional payment basis)",
      "Personal expenses and travel insurance",
      "Any additional Dehradun stay beyond package scope",
      "Anything not listed in inclusions",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Dehradun Arrival and Briefing",
        description:
          "Arrival pickup from Dehradun Airport/Railway Station and transfer to hotel (approx. 1.5 hours). Evening tour briefing, contact sharing, and duffel bag handover. Guests must carry only essential luggage in duffel bags; main luggage is not allowed in helicopter.",
      },
      {
        day: "Day 2",
        title: "Yamunotri (Kharsali)",
        description:
          "Schedule option 1/2: hotel checkout 05:00/10:00, Sahastradhara departure 05:45/11:00, Kharsali arrival 06:15/11:30. Proceed for Yamunotri (6 km trek) with Palki/Pony support. Return time approx. 5 hours 30 minutes. Meals at hotel.",
      },
      {
        day: "Day 3",
        title: "Gangotri (Harsil)",
        description:
          "Schedule option 1/2: Kharsali departure 06:15/11:30, Harsil arrival 06:45/12:00. Road transfer to Gangotri Temple (22 km, approx. 50 minutes) for VIP darshan (approx. 3.5 hours). Return for lunch and leisure at Harsil.",
      },
      {
        day: "Day 4",
        title: "Shri Kedarnath Ji",
        description:
          "Schedule option 1/2: hotel checkout 06:30/10:00, Harsil departure 07:00/12:30, Sersi/Guptkashi arrival 07:30/13:00. Change helicopter and take shuttle to Kedarnath. Helipad is around 650 meters from temple. Darshan followed by return stay at Sersi/Guptkashi.",
      },
      {
        day: "Day 5",
        title: "Shri Badrinath Ji",
        description:
          "Schedule option 1/2: Sersi/Guptkashi departure 06:00/11:00, Badrinath arrival 06:30/11:30. Hotel check-in, breakfast if pending, full-day sightseeing, and VIP darshan in afternoon/evening. Guests may opt for Maha Abhishek Puja next morning on additional payment basis.",
      },
      {
        day: "Day 6",
        title: "Return to Dehradun",
        description:
          "Schedule option 1/2: breakfast 06:00/10:00, Badrinath departure 06:30/11:00, Sahastradhara arrival 07:30/12:30. Transfer to Dehradun hotel to collect luggage, then drop to airport/railway station. Additional night can be arranged on extra cost with prior request.",
      },
    ],
    faqs: [
      {
        question: "What is the package price for this helicopter yatra?",
        answer:
          "The package price is INR 2,40,000 per person on all-inclusive basis.",
      },
      {
        question: "What is the route covered in this tour?",
        answer:
          "The route covers Yamunotri, Gangotri, Kedarnath, and Badrinath.",
      },
      {
        question: "Where does the journey start and end?",
        answer:
          "Both start and end points are in Dehradun (Sahastradhara helidrome operations).",
      },
      {
        question: "Can guests carry their own luggage bags in helicopter?",
        answer:
          "No. Guests are advised to keep only essential items in provided duffel bags for helicopter movement.",
      },
    ],
  },
  "kedarnath-and-badrinath-package-haridwar-to-haridwar": {
    travelStyles: ["Spiritual", "Pilgrimage", "Road Trip", "Group Tour"],
    facilities: ["Cab/Tempo Traveller", "Hotel Stay", "Breakfast", "Dinner"],
    minAge: "12+",
    pickup: "Haridwar",
    bestSeason: "May to October",
    pricingOptions: [
      { label: "Base Price", originalPrice: "Rs 14,500", price: "Rs 12,500" },
    ],
    highlights: [
      "Kedarnath and Badrinath darshan with key prayag stops",
      "Mana Village, Vyas Gufa, and Bhim Pul sightseeing",
      "5 Nights / 6 Days Haridwar-to-Haridwar plan",
      "Base price: Rs 12,500 per person",
    ],
    includes: [
      "Accommodation on double/triple/quad sharing",
      "Breakfast and dinner (no food in Kedarnath)",
      "Vehicle: cab or tempo traveller",
      "Sightseeing as per itinerary",
    ],
    excludes: [
      "Trek support (pony/palki) unless booked separately",
      "Any lunch and personal expenses",
      "Temple special puja charges",
      "Anything not mentioned in inclusions",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Haridwar to Sonprayag",
        description:
          "Pickup from Haridwar and drive via Devprayag and Rudraprayag; overnight at Sonprayag.",
      },
      {
        day: "Day 2",
        title: "Sonprayag to Kedarnath",
        description:
          "Transfer to Gaurikund and trek to Kedarnath; temple darshan and overnight stay.",
      },
      {
        day: "Day 3",
        title: "Kedarnath to Sonprayag",
        description:
          "Morning darshan, trek down to Gaurikund, and transfer back to Sonprayag.",
      },
      {
        day: "Day 4",
        title: "Sonprayag to Badrinath",
        description:
          "Drive via Joshimath and Vishnuprayag; evening Badrinath darshan and stay.",
      },
      {
        day: "Day 5",
        title: "Badrinath to Rishikesh",
        description:
          "Visit Mana Village, Vyas Gufa, Ganesh Gufa, and Bhim Pul; drive to Rishikesh.",
      },
      {
        day: "Day 6",
        title: "Rishikesh to Haridwar",
        description:
          "After breakfast, optional local visit and drop at Haridwar; tour ends.",
      },
    ],
    faqs: [
      {
        question: "What is the package price?",
        answer:
          "Base price is Rs 12,500 per person.",
      },
      {
        question: "What are the payment terms?",
        answer:
          "50% at booking and remaining 50% before departure.",
      },
      ...defaultFaqs.slice(2),
    ],
  },
  "kedarnath-and-badrinath-package-delhi-to-delhi": {
    travelStyles: ["Spiritual", "Pilgrimage", "Road Trip", "Group Tour"],
    facilities: ["Cab/Tempo Traveller", "Hotel Stay", "Breakfast", "Dinner"],
    minAge: "12+",
    pickup: "Delhi",
    bestSeason: "May to October",
    highlights: [
      "Delhi to Delhi 6 Nights / 7 Days pilgrimage plan",
      "Har Ki Pauri Ganga Aarti and Kedarnath-Badrinath darshan",
      "Mana Village sightseeing with Rishikesh halt",
      "Base price starts at Rs 14,500 per person",
    ],
    includes: [
      "Accommodation on double/triple/quad sharing",
      "Breakfast and dinner",
      "Vehicle: cab or tempo traveller",
      "Sightseeing as per itinerary",
    ],
    excludes: [
      "Trek support (pony/palki) unless booked separately",
      "Any lunch and personal expenses",
      "Temple special puja charges",
      "Anything not mentioned in inclusions",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Delhi to Haridwar",
        description:
          "Pickup from Delhi, hotel check-in at Haridwar, and evening Ganga Aarti at Har Ki Pauri.",
      },
      {
        day: "Day 2",
        title: "Haridwar to Sonprayag",
        description:
          "Drive via Devprayag and Rudraprayag, then overnight at Sonprayag.",
      },
      {
        day: "Day 3",
        title: "Sonprayag to Kedarnath",
        description:
          "Transfer to Gaurikund and trek to Kedarnath; evening darshan and stay.",
      },
      {
        day: "Day 4",
        title: "Kedarnath to Sonprayag",
        description:
          "Morning darshan, trek back, and transfer to Sonprayag for overnight stay.",
      },
      {
        day: "Day 5",
        title: "Sonprayag to Badrinath",
        description:
          "Drive via Joshimath and Vishnuprayag; evening Badrinath darshan.",
      },
      {
        day: "Day 6",
        title: "Badrinath to Rishikesh",
        description:
          "Morning Mana Village circuit sightseeing; drive to Rishikesh for overnight stay.",
      },
      {
        day: "Day 7",
        title: "Rishikesh to Delhi",
        description:
          "After breakfast, optional Ram Jhula/Laxman Jhula visit and return drop at Delhi.",
      },
    ],
    faqs: [
      {
        question: "What is the package price?",
        answer:
          "Base price starts at Rs 14,500 per person.",
      },
      ...defaultFaqs.slice(1),
    ],
  },
  "chardham-package-haridwar-to-haridwar": {
    travelStyles: ["Spiritual", "Pilgrimage", "Road Trip", "Group Tour"],
    facilities: ["Cab/Tempo/Urbania/Bus", "Hotel/Camp Stay", "Breakfast", "Dinner"],
    minAge: "12+",
    pickup: "Haridwar",
    bestSeason: "May to October",
    highlights: [
      "Complete Chardham circuit: Yamunotri, Gangotri, Kedarnath, Badrinath",
      "9 Nights / 10 Days Haridwar-to-Haridwar itinerary",
      "Covers Panch Prayag and Mana Village sightseeing",
      "Vehicle options: Cab, Tempo Traveller, Urbania, or Bus (as per group size)",
    ],
    includes: [
      "Accommodation as per selected room type",
      "Breakfast and dinner",
      "Transportation (cab/tempo traveller/urbania/bus)",
      "Temple visits and sightseeing as per itinerary",
    ],
    excludes: [
      "Airfare/train fare",
      "Entry fees/cable car tickets",
      "Travel insurance",
      "Personal expenses and items not listed in inclusions",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Haridwar to Barkot",
        description:
          "Pickup from Haridwar and scenic drive to Barkot; dinner and overnight stay.",
      },
      {
        day: "Day 2",
        title: "Barkot to Yamunotri to Barkot",
        description:
          "Drive to Janki Chatti and trek/pony to Yamunotri Temple for darshan; return to Barkot.",
      },
      {
        day: "Day 3",
        title: "Barkot to Uttarkashi",
        description:
          "Drive to Uttarkashi and visit Kashi Vishwanath Temple and Shakti Temple.",
      },
      {
        day: "Day 4",
        title: "Uttarkashi to Gangotri to Uttarkashi",
        description:
          "Early drive for Gangotri darshan and return to Uttarkashi for overnight stay.",
      },
      {
        day: "Day 5",
        title: "Uttarkashi to Guptkashi",
        description:
          "Long drive with mountain and river views en route to Guptkashi.",
      },
      {
        day: "Day 6",
        title: "Guptkashi to Kedarnath",
        description:
          "Drive to Gaurikund, trek/helicopter to Kedarnath, darshan and overnight stay.",
      },
      {
        day: "Day 7",
        title: "Kedarnath to Guptkashi",
        description:
          "Morning darshan, return to Gaurikund, and drive back to Guptkashi.",
      },
      {
        day: "Day 8",
        title: "Guptkashi to Badrinath",
        description:
          "Drive via Joshimath and Panch Prayag points; evening darshan at Badrinath.",
      },
      {
        day: "Day 9",
        title: "Badrinath to Rudraprayag",
        description:
          "Visit Tapt Kund, Brahma Kapal, Mana Village and continue to Rudraprayag.",
      },
      {
        day: "Day 10",
        title: "Rudraprayag to Haridwar",
        description:
          "Drive to Haridwar and drop; Chardham Yatra concludes.",
      },
    ],
    faqs: [
      {
        question: "What is the package pricing for this plan?",
        answer:
          "Pricing is shared on request based on travel dates, vehicle type, and room sharing preference.",
      },
      ...defaultFaqs.slice(1),
    ],
  },
  "chardham-package-delhi-to-delhi": {
    travelStyles: ["Spiritual", "Pilgrimage", "Road Trip", "Group Tour"],
    facilities: ["Cab/Tempo/Urbania/Bus", "Hotel/Camp Stay", "Breakfast", "Dinner"],
    minAge: "12+",
    pickup: "Delhi",
    bestSeason: "May to October",
    highlights: [
      "Complete Chardham route from Delhi: Yamunotri, Gangotri, Kedarnath, Badrinath",
      "10 Nights / 11 Days with Haridwar, Barkot, Uttarkashi, Guptkashi, and Rudraprayag stays",
      "Includes Mussoorie, Kempty Falls, Mana Village, and Dhari Devi/Rishikesh circuit",
      "Base price starts at Rs 20,500 per person",
    ],
    includes: [
      "Accommodation on double/triple/quad sharing basis",
      "Breakfast and dinner",
      "Transportation by cab/tempo traveller/urbania/bus",
      "Temple visits and sightseeing as per itinerary",
    ],
    excludes: [
      "Airfare/train fare",
      "Entry fees, ropeway/cable car tickets",
      "Personal expenses and insurance",
      "Anything not mentioned under inclusions",
    ],
    itinerary: [
      { day: "Day 1", title: "Delhi to Haridwar", description: "Pickup from Delhi, drive to Haridwar, evening Ganga Aarti at Har Ki Pauri, overnight stay." },
      { day: "Day 2", title: "Haridwar to Barkot via Mussoorie", description: "Drive via Mussoorie and Kempty Falls, continue to Barkot and overnight stay." },
      { day: "Day 3", title: "Barkot to Yamunotri to Barkot", description: "Drive to Janki Chatti, trek to Yamunotri (6 km one way), darshan, and return to Barkot." },
      { day: "Day 4", title: "Barkot to Uttarkashi", description: "Drive to Uttarkashi and visit Kashi Vishwanath Temple in evening." },
      { day: "Day 5", title: "Uttarkashi to Gangotri to Uttarkashi", description: "Early drive to Gangotri for darshan and return to Uttarkashi." },
      { day: "Day 6", title: "Uttarkashi to Guptkashi", description: "Long scenic drive via Tehri region; check in at Guptkashi." },
      { day: "Day 7", title: "Guptkashi to Kedarnath", description: "Drive to Gaurikund and trek to Kedarnath; evening aarti and overnight stay." },
      { day: "Day 8", title: "Kedarnath to Triyuginarayan to Guptkashi", description: "Morning darshan, descend to Gaurikund, visit Triyuginarayan, and stay at Guptkashi." },
      { day: "Day 9", title: "Guptkashi to Badrinath via Chopta/Joshimath", description: "Drive to Badrinath, en route temple stop in Joshimath, evening aarti." },
      { day: "Day 10", title: "Badrinath to Rudraprayag", description: "Morning darshan, visit Mana Village, continue to Rudraprayag via Prayag circuit." },
      { day: "Day 11", title: "Rudraprayag to Delhi", description: "Visit Dhari Devi and Rishikesh points (time permitting), then return to Delhi." },
    ],
    faqs: [
      { question: "What is the starting package price?", answer: "Base price starts at Rs 20,500 per person." },
      ...defaultFaqs.slice(1),
    ],
  },
  "gangotri-and-yamunotri-yatra-haridwar-to-haridwar": {
    travelStyles: ["Spiritual", "Pilgrimage", "Road Trip", "Group Tour"],
    facilities: ["Cab/Tempo/Urbania/Bus", "Hotel Stay", "Breakfast", "Dinner"],
    minAge: "10+",
    pickup: "Haridwar",
    bestSeason: "May to October",
    highlights: [
      "Yamunotri and Gangotri darshan in one compact circuit",
      "4 Nights / 5 Days with stays in Barkot, Uttarkashi, and Harsil",
      "Includes scenic Himalayan drives and temple visits",
      "Base price starts at Rs 12,500 per person",
    ],
    includes: [
      "Accommodation on double/triple/quad sharing basis",
      "Breakfast and dinner",
      "Transportation by cab/tempo traveller/urbania/bus",
      "Sightseeing and temple visits as per itinerary",
    ],
    excludes: [
      "Pony/palki charges and any adventure activities",
      "Personal expenses and insurance",
      "Any meal not listed",
      "Anything not mentioned under inclusions",
    ],
    itinerary: [
      { day: "Day 1", title: "Haridwar to Barkot", description: "Pickup from Haridwar and scenic drive via hill routes to Barkot." },
      { day: "Day 2", title: "Barkot to Yamunotri to Barkot", description: "Drive to Janki Chatti, trek to Yamunotri, darshan, and return to Barkot." },
      { day: "Day 3", title: "Barkot to Uttarkashi", description: "Drive to Uttarkashi and visit Vishwanath Temple (time permitting)." },
      { day: "Day 4", title: "Uttarkashi to Gangotri to Harsil", description: "Gangotri darshan and onward scenic stay at Harsil Valley." },
      { day: "Day 5", title: "Harsil to Haridwar", description: "Breakfast and return drive to Haridwar with drop." },
    ],
    faqs: [
      { question: "What is the package price?", answer: "Base price starts at Rs 12,500 per person." },
      ...defaultFaqs.slice(1),
    ],
  },
  "gangotri-and-yamunotri-yatra-delhi-to-delhi": {
    travelStyles: ["Spiritual", "Pilgrimage", "Road Trip", "Group Tour"],
    facilities: ["Cab/Tempo/Urbania/Bus", "Hotel Stay", "Breakfast", "Dinner"],
    minAge: "10+",
    pickup: "Delhi",
    bestSeason: "May to October",
    highlights: [
      "Delhi departure package for Yamunotri and Gangotri",
      "5 Nights / 6 Days with Haridwar, Barkot, Uttarkashi, and Harsil stay pattern",
      "Balanced temple darshan and scenic mountain route",
      "Base price starts at Rs 14,500 per person",
    ],
    includes: [
      "Accommodation on double/triple/quad sharing basis",
      "Breakfast and dinner",
      "Transportation by cab/tempo traveller/urbania/bus",
      "Sightseeing and temple visits as per itinerary",
    ],
    excludes: [
      "Pony/palki charges and any adventure activities",
      "Personal expenses and insurance",
      "Any meal not listed",
      "Anything not mentioned under inclusions",
    ],
    itinerary: [
      { day: "Day 1", title: "Delhi to Haridwar", description: "Pickup from Delhi, drive to Haridwar, check in and leisure evening." },
      { day: "Day 2", title: "Haridwar to Barkot", description: "Drive via Mussoorie/Kempty route (time permitting) and stay in Barkot." },
      { day: "Day 3", title: "Barkot to Yamunotri to Barkot", description: "Drive to Janki Chatti, trek to Yamunotri temple, and return." },
      { day: "Day 4", title: "Barkot to Uttarkashi", description: "Scenic transfer to Uttarkashi with temple visit in evening." },
      { day: "Day 5", title: "Uttarkashi to Gangotri to Harsil", description: "Gangotri darshan and transfer to Harsil for overnight stay." },
      { day: "Day 6", title: "Harsil to Delhi", description: "Return drive to Delhi and drop." },
    ],
    faqs: [
      { question: "What is the package price?", answer: "Base price starts at Rs 14,500 per person." },
      ...defaultFaqs.slice(1),
    ],
  },
  "kedarnath-yatra-haridwar-to-haridwar": {
    travelStyles: ["Spiritual", "Pilgrimage", "Trek", "Group Tour"],
    facilities: ["Cab/Tempo Traveller", "Hotel/Camp Stay", "Breakfast", "Dinner"],
    minAge: "12+",
    pickup: "Haridwar",
    bestSeason: "May to October",
    pricingOptions: [
      { label: "Base Price", originalPrice: "Rs 10,500", price: "Rs 8,500" },
    ],
    highlights: [
      "Dedicated Kedarnath yatra ex-Haridwar",
      "3 Nights / 4 Days with Guptkashi/Sitapur and Kedarnath stays",
      "Covers Devprayag, Rudraprayag, Kedarnath and Bhairavnath temple",
      "Base price: Rs 8,500 per person",
    ],
    includes: [
      "Accommodation on double/triple/quad sharing basis",
      "Breakfast and dinner (no meals at Kedarnath as per package notes)",
      "Transportation by cab/tempo traveller",
      "Local route support as per itinerary",
    ],
    excludes: [
      "Pony/palki/doli charges",
      "Personal expenses and insurance",
      "Any meal not listed",
      "Anything not mentioned under inclusions",
    ],
    itinerary: [
      { day: "Day 1", title: "Haridwar to Guptkashi/Sitapur", description: "Drive via Rishikesh, Devprayag, and Rudraprayag; overnight at Guptkashi/Sitapur." },
      { day: "Day 2", title: "Guptkashi to Kedarnath", description: "Transfer via Sonprayag and Gaurikund; 21 km trek to Kedarnath and evening darshan." },
      { day: "Day 3", title: "Kedarnath to Guptkashi/Sitapur", description: "Morning darshan and Bhairavnath visit; trek down and drive back." },
      { day: "Day 4", title: "Guptkashi/Sitapur to Haridwar", description: "Return drive to Haridwar and drop." },
    ],
    faqs: [
      { question: "What is the package price?", answer: "Base price is Rs 8,500 per person." },
      ...defaultFaqs.slice(1),
    ],
  },
  "kedarnath-yatra-delhi-to-delhi": {
    travelStyles: ["Spiritual", "Pilgrimage", "Heli Assisted", "Group Tour"],
    facilities: ["Cab/Tempo Traveller", "Hotel/Camp Stay", "Breakfast", "Dinner"],
    minAge: "12+",
    pickup: "Delhi",
    bestSeason: "May to October",
    pricingOptions: [
      { label: "Base Price", originalPrice: "Rs 12,500", price: "Rs 10,500" },
    ],
    highlights: [
      "Delhi to Delhi Kedarnath yatra with helicopter segment",
      "4 Nights / 5 Days with Rishikesh, Phata/Sirsi, Kedarnath, and Srinagar stay",
      "VIP/Priority Kedarnath darshan included in itinerary flow",
      "Base price: Rs 10,500 per person",
    ],
    includes: [
      "Accommodation on double/triple/quad sharing basis",
      "Breakfast and dinner",
      "Transportation by cab/tempo traveller",
      "Kedarnath helicopter segment as per schedule/availability",
    ],
    excludes: [
      "Special pujas and personal rituals",
      "Personal expenses and insurance",
      "Any meal not listed",
      "Anything not mentioned under inclusions",
    ],
    itinerary: [
      { day: "Day 1", title: "Delhi to Rishikesh", description: "Road transfer to Rishikesh, local visits, and evening Ganga Aarti." },
      { day: "Day 2", title: "Rishikesh to Phata/Sirsi", description: "Drive via Prayag route points and overnight at helipad base." },
      { day: "Day 3", title: "Phata/Sirsi to Kedarnath (Helicopter)", description: "Morning heli transfer, VIP darshan, evening aarti, and stay near temple." },
      { day: "Day 4", title: "Kedarnath to Srinagar", description: "Morning darshan, return helicopter to base, then drive to Srinagar." },
      { day: "Day 5", title: "Srinagar to Delhi", description: "Return drive via Rishikesh/Haridwar corridor and drop at Delhi." },
    ],
    faqs: [
      { question: "What is the package price?", answer: "Base price is Rs 10,500 per person." },
      ...defaultFaqs.slice(1),
    ],
  },
  "badrinath-yatra-delhi-to-delhi": {
    travelStyles: ["Spiritual", "Pilgrimage", "Road Trip", "Group Tour"],
    facilities: ["Cab/Tempo/Urbania/Bus", "Hotel Stay", "Breakfast", "Dinner"],
    minAge: "10+",
    pickup: "Delhi",
    bestSeason: "May to October",
    pricingOptions: [
      { label: "Base Price", originalPrice: "Rs 12,500", price: "Rs 10,500" },
    ],
    highlights: [
      "Badrinath-focused pilgrimage ex-Delhi",
      "4 Nights / 5 Days with Rudraprayag, Badrinath, and Rishikesh stays",
      "Includes Tapt Kund, Mana Village, and Vyas Gufa visit",
      "Base price: Rs 10,500 per person",
    ],
    includes: [
      "Accommodation on double/triple/quad sharing basis",
      "Breakfast and dinner",
      "Transportation by cab/tempo traveller/urbania/bus",
      "Sightseeing and darshan support as per itinerary",
    ],
    excludes: [
      "Entry fees and local optional activities",
      "Personal expenses and insurance",
      "Any meal not listed",
      "Anything not mentioned under inclusions",
    ],
    itinerary: [
      { day: "Day 1", title: "Delhi to Rudraprayag", description: "Morning departure from Delhi and overnight stay at Rudraprayag." },
      { day: "Day 2", title: "Rudraprayag to Badrinath", description: "Drive to Badrinath, check in, and leisure/local visit." },
      { day: "Day 3", title: "Badrinath to Rudraprayag", description: "Morning darshan, visit Mana and nearby points, return to Rudraprayag." },
      { day: "Day 4", title: "Rudraprayag to Rishikesh", description: "Drive to Rishikesh and evening free for Jhula/Ganga Aarti." },
      { day: "Day 5", title: "Rishikesh to Delhi", description: "Return drive to Delhi and drop." },
    ],
    faqs: [
      { question: "What is the package price?", answer: "Base price is Rs 10,500 per person." },
      ...defaultFaqs.slice(1),
    ],
  },
  "badrinath-yatra-haridwar-to-haridwar": {
    travelStyles: ["Spiritual", "Pilgrimage", "Road Trip", "Group Tour"],
    facilities: ["Cab/Tempo/Urbania/Bus", "Hotel Stay", "Breakfast", "Dinner"],
    minAge: "10+",
    pickup: "Haridwar",
    bestSeason: "May to October",
    pricingOptions: [
      { label: "Base Price", originalPrice: "Rs 10,500", price: "Rs 8,500" },
    ],
    highlights: [
      "Badrinath Yatra package: Haridwar to Haridwar",
      "4 Nights / 5 Days covering Rudraprayag, Badrinath, and Rishikesh",
      "Early morning Badrinath Temple darshan with Mana Village and Vyas Gufa visit",
      "Base price: Rs 8,500 per person",
    ],
    includes: [
      "Accommodation on double/triple/quad sharing basis",
      "Breakfast and dinner included",
      "Transportation by cab/tempo traveller/urbania/bus",
      "Sightseeing and temple visits as per itinerary",
      "Room/Tent/Camp in Kedarnath mentioned in original content retained as provided",
    ],
    excludes: [
      "Entry fees and local optional activities",
      "Personal expenses and insurance",
      "Any meal not listed",
      "Anything not mentioned under inclusions",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Haridwar to Rudraprayag",
        description:
          "Early morning departure from Haridwar. Drive to Rudraprayag, check in at hotel, and rest. Overnight stay at Rudraprayag.",
      },
      {
        day: "Day 2",
        title: "Rudraprayag to Badrinath",
        description:
          "Early breakfast at the hotel, then drive to Badrinath. Check in at hotel in Badrinath. Evening free for leisure or local sightseeing. Overnight stay at Badrinath.",
      },
      {
        day: "Day 3",
        title: "Badrinath to Rudraprayag",
        description:
          "Early morning darshan at Badrinath Temple. Visit Tapt Kund, Mana Village, and Vyas Gufa. After lunch, drive back to Rudraprayag, check in at hotel, and overnight stay.",
      },
      {
        day: "Day 4",
        title: "Rudraprayag to Rishikesh",
        description:
          "Early breakfast at hotel and drive to Rishikesh. Check in at hotel/guesthouse. Evening free to explore Lakshman Jhula, Ram Jhula, and Ganga Aarti. Overnight stay in Rishikesh.",
      },
      {
        day: "Day 5",
        title: "Rishikesh to Haridwar (Drop)",
        description:
          "After breakfast, drive back to Haridwar. Trip ends upon arrival in Haridwar.",
      },
    ],
    faqs: [
      {
        question: "What are the package categories and prices?",
        answer:
          "Base price is Rs 8,500 per person.",
      },
      {
        question: "What is included in this Badrinath Yatra package?",
        answer:
          "The package includes 4 Nights / 5 Days stay, breakfast and dinner, accommodation on double/triple/quad sharing, and transport by cab/tempo traveller/urbania/bus.",
      },
      ...defaultFaqs.slice(1),
    ],
  },
  "vietnam-explorer": {
    travelStyles: [
      "International",
      "Group Tour",
      "City Tours",
      "Cruise",
    ],
    facilities: [
      "4-Star Hotels",
      "Luxury Halong Bay Cruise",
      "Private AC Luxury Coach",
      "English-Speaking Local Guide",
    ],
    minAge: "8+",
    pickup: "New Delhi",
    bestSeason: "Year Round",
    highlights: [
      "Hanoi half-day city tour with Old Quarter and Hoan Kiem Lake",
      "Overnight luxury cruise in Halong Bay with activities",
      "Marble Mountains, Cam Thanh Village and Hoi An Old Town",
      "Ba Na Hills and Golden Bridge experience",
      "Mekong Delta excursion with local village experiences",
    ],
    includes: [
      "Roundtrip international and domestic flights",
      "Vietnam visa fees",
      "Accommodation in 4-star hotels and a luxury cruise",
      "All transfers and sightseeing by private AC luxury coach",
      "Meals as per itinerary: daily breakfast, lunch, and dinner",
      "Luxury Halong Bay cruise with onboard meals and activities",
      "Entry to all sightseeing locations as per itinerary",
      "Boat rides",
      "English-speaking local guide in each city",
      "Tips for guide and driver",
    ],
    excludes: [
      "5% TCS (Tax Collected at Source)",
      "Personal expenses (laundry, shopping, extra snacks, etc.)",
      "Beverages and meals not mentioned in the itinerary",
      "Optional or additional sightseeing/activities",
      "SIM cards, international roaming charges, or digital services not mentioned",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Hanoi and Half-Day City Tour",
        description:
          "Arrive at Noi Bai International Airport, transfer to hotel, check in, then visit Ba Dinh Square (outside Ho Chi Minh Mausoleum), Tran Quoc Pagoda, Train Street, Hoan Kiem Lake, and Hanoi Old Quarter.",
      },
      {
        day: "Day 2",
        title: "Hanoi to Halong Bay Overnight Cruise",
        description:
          "After breakfast, drive to Halong Bay and board an overnight luxury cruise. Enjoy cave visits, kayaking, sunset views, and onboard entertainment. Meals are served on cruise.",
      },
      {
        day: "Day 3",
        title: "Halong Bay to Hanoi and Flight to Danang",
        description:
          "Start with a morning Tai Chi session, light breakfast and brunch onboard. Disembark, return to Hanoi, and fly to Danang. Check in and relax.",
      },
      {
        day: "Day 4",
        title: "Marble Mountains, Cam Thanh Village and Hoi An",
        description:
          "Visit Marble Mountains, then continue to Cam Thanh Coconut Village for basket boat activities. Explore Hoi An Ancient Town including Japanese Bridge, old merchant houses, and lantern streets. Return to Danang.",
      },
      {
        day: "Day 5",
        title: "Ba Na Hills and Golden Bridge, Fly to Ho Chi Minh City",
        description:
          "Take a full-day Ba Na Hills tour via cable car, visit Golden Bridge, French Village, Fantasy Park, and gardens. Later transfer to airport and fly to Ho Chi Minh City.",
      },
      {
        day: "Day 6",
        title: "Mekong Delta Tour and Ho Chi Minh Shopping",
        description:
          "Enjoy a full-day Mekong Delta excursion including boat ride, Unicorn Island, bee farm, and coconut candy village with local tastings. Return to Ho Chi Minh and shop at Ben Thanh Market.",
      },
      {
        day: "Day 7",
        title: "Departure from Ho Chi Minh to Delhi",
        description:
          "After breakfast, check out and transfer to Tan Son Nhat International Airport for your return flight to Delhi.",
      },
    ],
    faqs: [
      {
        question: "What is the package price for this Vietnam tour?",
        answer: "The package price is Rs 95,000 per person (all inclusive, excluding listed exclusions).",
      },
      {
        question: "Which destinations are covered in this itinerary?",
        answer: "The tour covers Hanoi, Halong Bay, Danang, and Ho Chi Minh City.",
      },
      ...defaultFaqs.slice(2),
    ],
  },
  "andaman-island-escape": {
    travelStyles: [
      "Island Tour",
      "Beach Holiday",
      "Leisure",
      "Family",
    ],
    facilities: [
      "AC Accommodation",
      "Private Ferry/Cruise Transfers",
      "Exclusive AC Vehicle",
      "On-call Trip Assistance",
    ],
    minAge: "5+",
    pickup: "Port Blair Airport",
    bestSeason: "October to May",
    highlights: [
      "Corbyn's Cove Beach and Cellular Jail Sound & Light Show",
      "Elephant Beach water activities and Radhanagar Beach sunset",
      "Chidiya Tapu sunset point and Sagarika shopping stop",
      "Private island transfers and curated sightseeing",
    ],
    includes: [
      "Non-alcoholic welcome drink and flower bouquet on arrival",
      "AC accommodation on double sharing basis",
      "2 nights in Port Blair and 1 night in Havelock Island",
      "Daily breakfast at all hotels",
      "Private ferry/cruise transfers between islands",
      "All sightseeing as per itinerary in exclusive AC vehicle",
      "All parking charges",
      "On-call assistance throughout the tour",
      "Alternate arrangements in case of weather changes",
    ],
    excludes: [
      "Vehicle services on leisure days or after sightseeing hours",
      "Personal expenses, optional tours, tips, laundry, and calls",
      "Extra meals, drinks, and snacks outside inclusions",
      "Water sports and honeymoon inclusions (optional and extra)",
      "Costs from unforeseen events (flight delays, health issues, etc.)",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrive Port Blair, Corbyn's Cove and Cellular Jail",
        description:
          "Arrival at Port Blair airport and transfer to hotel. After check-in, visit Corbyn's Cove Beach, then Cellular Jail, followed by the Sound and Light Show. Overnight stay in Port Blair.",
      },
      {
        day: "Day 2",
        title: "Port Blair to Havelock, Elephant Beach and Radhanagar Beach",
        description:
          "Transfer to Havelock Island by private ferry/cruise. Visit Elephant Beach for water activities and Radhanagar Beach for sunset and relaxation. Overnight stay at Havelock Island.",
      },
      {
        day: "Day 3",
        title: "Havelock to Port Blair, Chidiya Tapu and Shopping",
        description:
          "Return to Port Blair by private ferry and check in. Later visit Chidiya Tapu for scenic views and sunset, followed by Sagarika Emporium for local handicrafts and souvenirs. Overnight stay in Port Blair.",
      },
      {
        day: "Day 4",
        title: "Departure from Port Blair",
        description:
          "Check out from hotel and transfer to Port Blair airport for departure with tour memories.",
      },
    ],
    faqs: [
      {
        question: "Which hotels are planned for this Andaman package?",
        answer:
          "Port Blair options include Hotel Marina Manor, Reef Atlantis, Grand Paradise, Aries Grand, Blu Horizon, Bay Walk, Blu Mmarlin, and Amigrace. Havelock options include Havelock Exotic Beach Resort, Lemon Grass Beach Resort, Blue Bird Resort, Heaven Garden, and Senses.",
      },
      {
        question: "Are water sports included in this package?",
        answer:
          "Water sports are available at Elephant Beach but are optional and charged extra unless explicitly included in your booking.",
      },
      ...defaultFaqs.slice(2),
    ],
  },
  "andaman-and-nicobar-island": {
    travelStyles: [
      "Island Tour",
      "Beach Holiday",
      "Leisure",
      "Family",
    ],
    facilities: [
      "AC Accommodation",
      "Private Ferry/Cruise Transfers",
      "Exclusive AC Vehicle",
      "On-call Trip Assistance",
    ],
    minAge: "5+",
    pickup: "Port Blair Airport",
    bestSeason: "October to May",
    highlights: [
      "Corbyn's Cove Beach, Cellular Jail and Sound & Light Show",
      "Elephant Beach activities and Radhanagar Beach sunset at Havelock",
      "Kalapatthar Beach plus Neil Island with Bharatpur and Laxmanpur",
      "Sitapur Beach, Ross Island, Fisheries Museum and Sagarika shopping",
    ],
    includes: [
      "Non-alcoholic welcome drink and flower bouquet on arrival",
      "AC accommodation on double sharing basis",
      "2 nights in Port Blair, 1 night in Havelock Island, 1 night in Neil Island",
      "Daily breakfast at all hotels",
      "Private ferry/cruise transfers between islands",
      "All sightseeing as per itinerary in exclusive AC vehicle",
      "All parking charges",
      "On-call assistance throughout the tour",
      "Alternate arrangements in case of weather changes",
    ],
    excludes: [
      "Vehicle services on leisure days or after sightseeing hours",
      "Personal expenses, optional tours, tips, laundry, and calls",
      "Extra meals, drinks, and snacks outside inclusions",
      "Water sports and honeymoon inclusions (optional and extra)",
      "Costs from unforeseen events (flight delays, health issues, etc.)",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrive Port Blair, Corbyn's Cove and Cellular Jail",
        description:
          "Arrival at Port Blair airport, meet and greet, hotel check-in. Post-lunch visit Corbyn's Cove Beach and Cellular Jail followed by Sound & Light Show. Overnight stay in Port Blair.",
      },
      {
        day: "Day 2",
        title: "Port Blair to Havelock, Elephant Beach and Radhanagar Beach",
        description:
          "Morning private ferry to Havelock Island and hotel check-in. Visit Elephant Beach for activities like snorkeling and sea walk, then visit Radhanagar Beach for sunset. Overnight stay in Havelock.",
      },
      {
        day: "Day 3",
        title: "Havelock to Neil Island via Kalapatthar Beach",
        description:
          "Visit Kalapatthar Beach in the morning, then ferry to Neil Island. Explore Bharatpur Beach and enjoy sunset at Laxmanpur Beach. Overnight stay in Neil Island.",
      },
      {
        day: "Day 4",
        title: "Neil Island to Port Blair, Sitapur Beach and City Visits",
        description:
          "Check out and visit Sitapur Beach, then ferry back to Port Blair. Visit Fisheries Museum, Ross Island, and Sagarika Emporium. Overnight stay in Port Blair.",
      },
      {
        day: "Day 5",
        title: "Depart Port Blair",
        description:
          "After check-out, transfer to Port Blair airport for departure with tour memories.",
      },
    ],
    faqs: [
      {
        question: "How many nights are included in each island?",
        answer:
          "This package includes 2 nights in Port Blair, 1 night in Havelock Island, and 1 night in Neil Island.",
      },
      {
        question: "Are water sports included in this package?",
        answer:
          "Water sports are available at selected beaches but are optional and charged extra unless explicitly included in your booking.",
      },
      ...defaultFaqs.slice(2),
    ],
  },
  "kashmir-valley-escape": {
    travelStyles: ["Nature", "Leisure", "Family", "Honeymoon"],
    facilities: [
      "Houseboat Stay",
      "Airport Pickup",
      "Daily Breakfast",
      "Guided Tours",
    ],
    minAge: "5+",
    pickup: "Srinagar Airport",
    bestSeason: "March to October",
    highlights: [
      "Shikara ride on Dal Lake",
      "Gulmarg cable car and meadow views",
      "Pahalgam valley excursion",
      "Mughal gardens and old Srinagar walk",
    ],
    includes: [
      "Hotels and houseboat stay",
      "Breakfast and dinner",
      "Airport transfers",
      "Sightseeing by cab",
    ],
    excludes: [
      "Flight/train tickets",
      "Gondola tickets",
      "Personal expenses",
      "Any adventure activity fees",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Srinagar",
        description:
          "Airport pickup, check-in, and evening shikara ride.",
      },
      {
        day: "Day 2",
        title: "Srinagar Local",
        description:
          "Visit Mughal gardens, Hazratbal, and old city markets.",
      },
      {
        day: "Day 3",
        title: "Gulmarg Day Trip",
        description:
          "Explore Gulmarg meadow and optional gondola experience.",
      },
      {
        day: "Day 4",
        title: "Pahalgam Excursion",
        description:
          "Scenic drive to Pahalgam with riverside viewpoints.",
      },
      {
        day: "Day 5",
        title: "Leisure and Departure",
        description: "Free time for shopping and airport drop.",
      },
    ],
    faqs: defaultFaqs,
  },
  "kerala-backwaters-retreat": {
    travelStyles: ["Leisure", "Nature", "Wellness", "Family"],
    facilities: [
      "Houseboat",
      "Private Cab",
      "Breakfast",
      "Hotel Stay",
    ],
    minAge: "3+",
    pickup: "Kochi Airport / Railway Station",
    bestSeason: "September to March",
    highlights: [
      "Alleppey backwater houseboat cruise",
      "Tea gardens of Munnar",
      "Fort Kochi heritage quarter",
      "Sunset and local cuisine experiences",
    ],
    includes: [
      "Accommodation and breakfast",
      "One-night houseboat stay",
      "Intercity transfers",
      "Sightseeing support",
    ],
    excludes: [
      "Airfare/train fare",
      "Lunch and special dinners",
      "Entry tickets where applicable",
      "Personal expenses",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrive Kochi",
        description:
          "Pickup, check-in, and local heritage walk in Fort Kochi.",
      },
      {
        day: "Day 2",
        title: "Kochi to Munnar",
        description:
          "Drive to Munnar via waterfalls and spice plantation stops.",
      },
      {
        day: "Day 3",
        title: "Munnar Sightseeing",
        description:
          "Visit tea museum, viewpoints, and local market.",
      },
      {
        day: "Day 4",
        title: "Munnar to Alleppey",
        description:
          "Transfer to Alleppey and board premium backwater houseboat.",
      },
      {
        day: "Day 5",
        title: "Departure",
        description:
          "Disembark and transfer to Kochi for onward journey.",
      },
    ],
    faqs: defaultFaqs,
  },
};

function buildDefaultDetails(
  pkg: (typeof allPackages)[number],
): Omit<PackageDetailsContent, "slug"> {
  const cleanTitle = stripPackageTitleSuffix(pkg.title);
  return {
    travelStyles: [
      pkg.category,
      "Guided",
      "Group Travel",
      "Leisure",
    ],
    facilities: [
      "Hotel Stay",
      "Transport",
      "Meals",
      "Support Team",
    ],
    minAge: "10+",
    pickup: "City Pickup Point",
    bestSeason: "Year Round",
    highlights: [
      `Explore the best of ${pkg.location}`,
      "Comfortable stay and smooth transfers",
      "Balanced itinerary with guided sightseeing",
      "Perfect for families, friends, and small groups",
    ],
    includes: [
      "Accommodation as per package",
      "Transport for itinerary movement",
      "Selected meals",
      "Trip assistance",
    ],
    excludes: [
      "Personal expenses",
      "Travel insurance",
      "Activities not listed in inclusions",
      "Any item not mentioned in inclusions",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: `Arrival in ${pkg.location}`,
        description:
          "Meet and greet, transfer to hotel, and orientation.",
      },
      {
        day: "Day 2",
        title: "Local Exploration",
        description:
          "Guided sightseeing covering key attractions and local experiences.",
      },
      {
        day: "Day 3",
        title: "Activity and Leisure",
        description:
          "Mix of planned activities and free time for personal exploration.",
      },
      {
        day: "Day 4",
        title: "Departure",
        description:
          "Checkout and transfer for your onward journey.",
      },
    ],
    faqs: [
      {
        question: `How many days is ${cleanTitle}?`,
        answer: `This package is ${pkg.duration} and includes planned sightseeing with support.`,
      },
      ...defaultFaqs.slice(1),
    ],
  };
}

for (const pkg of allPackages) {
  const slug = packageTitleToSlug(pkg.title);
  if (!detailsBySlug[slug]) {
    detailsBySlug[slug] = buildDefaultDetails(pkg);
  }
}

export const packageDetailsBySlug: Record<
  string,
  PackageDetailsContent
> = Object.fromEntries(
  Object.entries(detailsBySlug).map(([slug, details]) => [
    slug,
    {
      slug,
      ...details,
    },
  ]),
) as Record<string, PackageDetailsContent>;
