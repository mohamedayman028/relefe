/* ============================================================
   RELIEF CAFE — Premium Digital Menu Script v2
   ============================================================ */


'use strict';

/* ── i18n Translations Dictionary ────────────────────────── */
const translations = {
  en: {
    'nav-logo':        'RELIEF',
    'nav-home':        'Home',
    'nav-story':       'Our Story',
    'nav-signature':   'Signature',
    'nav-menu':        'Menu',
    'nav-hours':       'Open daily \u00a0<span>7AM \u2013 1AM</span>',
    'cat-coffee':      'Hot Coffee',
    'cat-hot':         'Hot Drinks',
    'cat-milkshakes':  'Milkshakes',
    'cat-frappes':     'Frappes',
    'cat-frappuccino': 'Frappuccino',
    'cat-matcha':      'Matcha',
    'cat-boba':        'Boba',
    'cat-mojitos':     'Mojitos',
    'cat-fresh-juices':'Fresh Juices',
    'cat-ice-drinks':  'Ice Drinks',
    'cat-smoothies':   'Smoothies',
    'cat-soft-drinks': 'Soft Drinks',
    'cat-desserts':    'Desserts',
    'cat-specialty-coffee': 'Specialty Coffee',
    'cat-extra':       'Extras',
    'items-suffix':    'Items',
  },
  ar: {
    'nav-logo':        'ريليف',
    'nav-home':        'الرئيسية',
    'nav-story':       'قصتنا',
    'nav-signature':   'المميزة',
    'nav-menu':        'القائمة',
    'nav-hours':       'مفتوح يومياً \u00a0<span>7 صباحاً \u2013 1 صباحاً</span>',
    'cat-coffee':      'قهوة ساخنة',
    'cat-hot':         'مشروبات ساخنة',
    'cat-milkshakes':  'ميلك شيك',
    'cat-frappes':     'فرابيه',
    'cat-frappuccino': 'فرابيتشينو',
    'cat-matcha':      'ماتشا',
    'cat-boba':        'بوبا',
    'cat-mojitos':     'موهيتو',
    'cat-fresh-juices':'عصائر طازجة',
    'cat-ice-drinks':  'مشروبات مثلجة',
    'cat-smoothies':   'سموزي',
    'cat-soft-drinks': 'مشروبات غازية',
    'cat-desserts':    'حلويات',
    'cat-specialty-coffee': 'قهوة مختصة',
    'cat-extra':       'إضافات',
    'items-suffix':    'عنصر',
  }
};

/* ── Categories Definition Array ───────────────────────────── */
const categories = [
  { id: 'coffee',           nameEn: 'Hot Coffee',       nameAr: 'قهوة ساخنة' },
  { id: 'hot',              nameEn: 'Hot Drinks',       nameAr: 'مشروبات ساخنة' },
  { id: 'milkshakes',       nameEn: 'Milkshakes',       nameAr: 'ميلك شيك' },
  { id: 'frappes',          nameEn: 'Frappes',          nameAr: 'فرابيه' },
  { id: 'frappuccino',      nameEn: 'Frappuccino',      nameAr: 'فرابيتشينو' },
  { id: 'matcha',           nameEn: 'Matcha',           nameAr: 'ماتشا' },
  { id: 'boba',             nameEn: 'Boba',             nameAr: 'بوبا' },
  { id: 'mojitos',          nameEn: 'Mojitos',          nameAr: 'موهيتو' },
  { id: 'fresh-juices',     nameEn: 'Fresh Juices',     nameAr: 'عصائر طازجة' },
  { id: 'ice-drinks',       nameEn: 'Ice Drinks',       nameAr: 'مشروبات مثلجة' },
  { id: 'smoothies',        nameEn: 'Smoothies',        nameAr: 'سموزي' },
  { id: 'soft-drinks',      nameEn: 'Soft Drinks',      nameAr: 'مشروبات غازية' },
  { id: 'desserts',         nameEn: 'Desserts',         nameAr: 'حلويات' },
  { id: 'specialty-coffee', nameEn: 'Specialty Coffee', nameAr: 'قهوة مختصة' },
  { id: 'extra',            nameEn: 'Extras',           nameAr: 'إضافات' }
];
window.categories = categories;

let currentLang = 'en';

/* ── Full Bilingual Category Data Store ────────────────────── */
const categoryData = {
  coffee: [
    { nameEn: "Espresso", nameAr: "إسبريسو", price: "55 EGP" },
    { nameEn: "Hot Mocha", nameAr: "موكا ساخنة", price: "85 EGP" },
    { nameEn: "Hot White Mocha", nameAr: "وايت موكا ساخنة", price: "90 EGP" },
    { nameEn: "Hot Spanish Latte", nameAr: "سبانيش لاتيه ساخن", price: "95 EGP" },
    { nameEn: "Hot Caramel Macchiato", nameAr: "كاراميل ماكياتو ساخن", price: "84 EGP" },
    { nameEn: "Macchiato", nameAr: "ماكياتو", price: "65 EGP" },
    { nameEn: "Cappuccino", nameAr: "كابوتشينو", price: "75 EGP" },
    { nameEn: "Hot Latte", nameAr: "لاتيه ساخن", price: "73 EGP" },
    { nameEn: "Flat White", nameAr: "فلات وايت", price: "75 EGP" },
    { nameEn: "Hot Americano", nameAr: "أمريكانو ساخن", price: "75 EGP" },
    { nameEn: "Nescafé", nameAr: "نسكافيه", price: "70 EGP" },
    { nameEn: "Black Nescafé", nameAr: "نسكافيه بلاك", price: "55 EGP" },
    { nameEn: "Turkish Coffee", nameAr: "قهوة تركي", price: "50 EGP" },
    { nameEn: "Special Turkish Coffee", nameAr: "قهوة تركي مخصوص", price: "70 EGP" },
    { nameEn: "Nutella Coffee", nameAr: "قهوة نوتيلا", price: "69 EGP" },
    { nameEn: "Cortado", nameAr: "كورتادو", price: "70 EGP" }
  ],
  hot: [
    { nameEn: "Hot Chocolate", nameAr: "شوكولاتة ساخنة", price: "77 EGP" },
    { nameEn: "Hot Cider", nameAr: "سايدر تفاح ساخن", price: "53 EGP" },
    { nameEn: "Hot Pistachio", nameAr: "بستاشيو ساخن", price: "83 EGP" },
    { nameEn: "Hot Caramel", nameAr: "كراميل ساخن", price: "68 EGP" },
    { nameEn: "Hot Lotus", nameAr: "لوتس ساخن", price: "73 EGP" },
    { nameEn: "Hot Oreo", nameAr: "أوريو ساخن", price: "73 EGP" },
    { nameEn: "Herbal Tea Mix", nameAr: "شاي أعشاب مشكل", price: "38 EGP" }
  ],
  milkshakes: [
    { nameEn: "Chocolate Milkshake", nameAr: "ميلك شيك شوكولاتة", price: "75 EGP" },
    { nameEn: "Vanilla Milkshake", nameAr: "ميلك شيك فانيليا", price: "70 EGP" },
    { nameEn: "Strawberry Milkshake", nameAr: "ميلك شيك فراولة", price: "75 EGP" },
    { nameEn: "Oreo Milkshake", nameAr: "ميلك شيك أوريو", price: "80 EGP" },
    { nameEn: "Lotus Milkshake", nameAr: "ميلك شيك لوتس", price: "85 EGP" },
    { nameEn: "Pistachio Milkshake", nameAr: "ميلك شيك بستاشيو", price: "90 EGP" }
  ],
  iceDrinks: [
    { nameEn: "Iced Latte", nameAr: "آيس لاتيه", price: "65 EGP" },
    { nameEn: "Iced Spanish Latte", nameAr: "آيس سبانيش لاتيه", price: "95 EGP" },
    { nameEn: "Iced Americano", nameAr: "آيس أمريكانو", price: "60 EGP" },
    { nameEn: "Iced Caramel Macchiato", nameAr: "آيس كراميل ماكياتو", price: "80 EGP" },
    { nameEn: "Iced Mocha", nameAr: "آيس موكا", price: "85 EGP" }
  ],
  smoothies: [
    { nameEn: "Strawberry Smoothie", nameAr: "سموزي فراولة", price: "50 EGP" },
    { nameEn: "Mango Smoothie", nameAr: "سموزي مانجو", price: "55 EGP" },
  ],
  desserts: [
    { nameEn: "Chocolate Molten Cake",                nameAr: "مولتن كيك شوكولاتة",                   price: "90 EGP",  image: "./Chocolate Molten Cake.jpg" },
    { nameEn: "Nutella Molten Cake",                  nameAr: "مولتن كيك نوتيلا",                     price: "95 EGP",  image: "./Nutella Molten Cake.jpg" },
    { nameEn: "Lotus Molten Cake",                    nameAr: "مولتن كيك لوتس",                       price: "95 EGP",  image: "./Lotus Molten Cake.jpg" },
    { nameEn: "Pistachio Molten Cake",                nameAr: "مولتن كيك بيستاشيو",                   price: "98 EGP",  image: "./Pistachio Molten Cake.jpg" },
    { nameEn: "Nutella Cheesecake",                   nameAr: "تشيز كيك نوتيلا",                      price: "88 EGP",  image: "./Nutella Cheesecake.jpg" },
    { nameEn: "Lotus Cheesecake",                     nameAr: "تشيز كيك لوتس",                        price: "88 EGP",  image: "./Lotus Cheesecake.jpg" },
    { nameEn: "Caramel Cheesecake",                   nameAr: "تشيز كيك كراميل",                      price: "88 EGP",  image: "./Caramel Cheesecake.jpg" },
    { nameEn: "Strawberry Cheesecake",                nameAr: "تشيز كيك فراولة",                      price: "88 EGP",  image: "./Strawberry Cheesecake.jpg" },
    { nameEn: "Blueberry Cheesecake",                 nameAr: "تشيز كيك بلوبيري",                     price: "88 EGP",  image: "./Blueberry Cheesecake.jpg" },
    { nameEn: "Mixed Berry Cheesecake",               nameAr: "تشيز كيك ميكس بيري",                  price: "88 EGP",  image: "./Mixed Berry Cheesecake.jpg" },
    { nameEn: "Pistachio Cheesecake",                 nameAr: "تشيز كيك بيستاشيو",                    price: "93 EGP",  image: "./Pistachio Cheesecake.jpg" },
    { nameEn: "Nutella San Sebastián Cheesecake",     nameAr: "سان سيباستيان تشيز كيك نوتيلا",        price: "88 EGP",  image: "./Nutella San Sebastián.jpg" },
    { nameEn: "Lotus San Sebastián Cheesecake",       nameAr: "سان سيباستيان تشيز كيك لوتس",          price: "88 EGP",  image: "./Lotus San Sebastián Cheesecake.jpg" },
    { nameEn: "Caramel San Sebastián Cheesecake",     nameAr: "سان سيباستيان تشيز كيك كراميل",        price: "88 EGP",  image: "./Caramel San Sebastián.jpg" },
    { nameEn: "Pistachio San Sebastián Cheesecake",   nameAr: "سان سيباستيان تشيز كيك بيستاشيو",      price: "93 EGP",  image: "./Pistachio San Sebastián.jpg" },
    { nameEn: "Strawberry San Sebastián Cheesecake",  nameAr: "سان سيباستيان تشيز كيك فراولة",        price: "88 EGP",  image: "./Strawberry San Sebastian.jpg" },
    { nameEn: "Blueberry San Sebastián Cheesecake",   nameAr: "سان سيباستيان تشيز كيك بلوبيري",       price: "88 EGP",  image: "./Blueberry San Sebastián.jpg" },
    { nameEn: "Mixed Berry San Sebastián Cheesecake", nameAr: "سان سيباستيان تشيز كيك ميكس بيري",     price: "88 EGP",  image: "./Mixed Berry San Sebastián.jpg" },
    { nameEn: "Tiramisu",                             nameAr: "تيراميسو",                              price: "88 EGP",  image: "./Tiramisu.jpg" },
    { nameEn: "Cookies",                              nameAr: "كوكيز",                                 price: "—",       image: "./Cookies.jpg" },
    { nameEn: "Nutella Donut",                        nameAr: "دونات نوتيلا",                          price: "—",       image: "./Nutella Donut.jpg" },
    { nameEn: "Pistachio Donut",                      nameAr: "دونات بيستاشيو",                        price: "—",       image: "./Pistachio Donut.jpg" },
    { nameEn: "Lotus Donut",                          nameAr: "دونات لوتس",                            price: "—",       image: "./Lotus Donut.jpg" },
    { nameEn: "Nutella Croissant",                    nameAr: "كرواسون نوتيلا",                        price: "63 EGP",  image: "./Nutella Croissant.jpg" },
    { nameEn: "Pistachio Croissant",                  nameAr: "كرواسون بيستاشيو",                      price: "70 EGP",  image: "./Pistachio Croissant.jpg" },
    { nameEn: "Lotus Croissant",                      nameAr: "كرواسون لوتس",                          price: "63 EGP",  image: "./Lotus Croissant.jpg" }
  ],
  extras: [
    { nameEn: "Boba Pearls", nameAr: "حبيبات البوبا", price: "35 EGP", descEn: "Add extra tapioca pearls", descAr: "إضافة حبيبات التابيوكا الإضافية" },
    { nameEn: "Extra Espresso Shot", nameAr: "جرعة إسبريسو إضافية", price: "45 EGP", descEn: "Add an extra shot of espresso", descAr: "إضافة جرعة إسبريسو إضافية" },
    { nameEn: "Ice Cream Scoop", nameAr: "كرة أيس كريم", price: "30 EGP", descEn: "Add a scoop of ice cream", descAr: "إضافة كرة أيس كريم" },
    { nameEn: "Honey", nameAr: "عسل طبيعي", price: "25 EGP", descEn: "Add natural honey", descAr: "إضافة عسل طبيعي" },
    { nameEn: "Flavor Syrup", nameAr: "سيروب نكهة", price: "35 EGP", descEn: "Add your favorite syrup flavor", descAr: "إضافة نكهة السيروب المفضلة لديك" },
    { nameEn: "Whipped Cream", nameAr: "كريمة مخفوقة", price: "35 EGP", descEn: "Add creamy whipped topping", descAr: "إضافة طبقة كريمة مخفوقة" },
    { nameEn: "Mixed Nuts", nameAr: "مكسرات مشكلة", price: "35 EGP", descEn: "Add a crunchy mixed nuts topping", descAr: "إضافة مكسرات مقرمشة مشكلة" }
  ]
};
window.categoryData = categoryData;

/* ── Product Name Translation Mapping (100% Complete) ─────── */
const productNameMap = {
  /* ── Hot Coffee ── */
  "Espresso":                    { en: "Espresso",                    ar: "إسبريسو" },
  "Hot Mocha":                   { en: "Hot Mocha",                   ar: "موكا ساخنة" },
  "Hot White Mocha":             { en: "Hot White Mocha",             ar: "وايت موكا ساخنة" },
  "Hot Spanish Latte":           { en: "Hot Spanish Latte",           ar: "سبانيش لاتيه ساخن" },
  "Hot Caramel Macchiato":       { en: "Hot Caramel Macchiato",       ar: "كاراميل ماكياتو ساخن" },
  "Macchiato":                   { en: "Macchiato",                   ar: "ماكياتو" },
  "Cappuccino":                  { en: "Cappuccino",                  ar: "كابوتشينو" },
  "Hot Latte":                   { en: "Hot Latte",                   ar: "لاتيه ساخن" },
  "Flat White":                  { en: "Flat White",                  ar: "فلات وايت" },
  "Hot Americano":               { en: "Hot Americano",               ar: "أمريكانو ساخن" },
  "Nescafé":                     { en: "Nescafé",                     ar: "نسكافيه" },
  "Necafé":                      { en: "Nescafé",                     ar: "نسكافيه" },
  "Black Nescafé":               { en: "Black Nescafé",               ar: "نسكافيه بلاك" },
  "Turkish Coffee":              { en: "Turkish Coffee",              ar: "قهوة تركي" },
  "Special Turkish Coffee":      { en: "Special Turkish Coffee",      ar: "قهوة تركي مخصوص" },
  "Nutella Coffee":              { en: "Nutella Coffee",              ar: "قهوة نوتيلا" },
  "Cortado":                     { en: "Cortado",                     ar: "كورتادو" },

  /* ── Hot Drinks ── */
  "Hot Chocolate":               { en: "Hot Chocolate",               ar: "شوكولاتة ساخنة" },
  "Hot Cider":                   { en: "Hot Cider",                   ar: "سايدر تفاح ساخن" },
  "Hot Pistachio":               { en: "Hot Pistachio",               ar: "بستاشيو ساخن" },
  "Hot Caramel":                 { en: "Hot Caramel",                 ar: "كراميل ساخن" },
  "Hot Lotus":                   { en: "Hot Lotus",                   ar: "لوتس ساخن" },
  "Hot Oreo":                    { en: "Hot Oreo",                    ar: "أوريو ساخن" },
  "Herbal Tea Mix":              { en: "Herbal Tea Mix",              ar: "شاي أعشاب مشكل" },
  "Anise Tea":                   { en: "Anise Tea",                   ar: "شاي يانسون" },
  "Hibiscus Tea":                { en: "Hibiscus Tea",                ar: "شاي كركديه" },
  "Tea":                         { en: "Tea",                         ar: "شاي" },
  "Milk Tea":                    { en: "Milk Tea",                    ar: "شاي بالحليب" },
  "Sahlab with Mixed Nuts":      { en: "Sahlab with Mixed Nuts",      ar: "سحلب بالمكسرات المشكلة" },

  /* ── Milkshakes ── */
  "Oreo Milkshake":              { en: "Oreo Milkshake",              ar: "ميلك شيك أوريو" },
  "Caramel Milkshake":           { en: "Caramel Milkshake",           ar: "ميلك شيك كراميل" },
  "Chocolate Milkshake":         { en: "Chocolate Milkshake",         ar: "ميلك شيك شوكولاتة" },
  "Nutella Milkshake":           { en: "Nutella Milkshake",           ar: "ميلك شيك نوتيلا" },
  "Pistachio Milkshake":         { en: "Pistachio Milkshake",         ar: "ميلك شيك بستاشيو" },
  "Lotus Milkshake":             { en: "Lotus Milkshake",             ar: "ميلك شيك لوتس" },
  "Peach Milkshake":             { en: "Peach Milkshake",             ar: "ميلك شيك خوخ" },
  "Blueberry Milkshake":         { en: "Blueberry Milkshake",         ar: "ميلك شيك توت أزرق" },
  "Kinder Milkshakee":           { en: "Kinder Milkshake",            ar: "ميلك شيك كيندر" },
  "KitKat Milkshake":            { en: "KitKat Milkshake",            ar: "ميلك شيك كيت كات" },
  "Snickers Milkshake":          { en: "Snickers Milkshake",          ar: "ميلك شيك سنيكرز" },
  "Vanilla Milkshake":           { en: "Vanilla Milkshake",           ar: "ميلك شيك فانيليا" },
  "Strawberry Milkshake":        { en: "Strawberry Milkshake",        ar: "ميلك شيك فراولة" },
  "Mango Milkshake":             { en: "Mango Milkshake",             ar: "ميلك شيك مانجو" },
  "Galaxy Milkshake":            { en: "Galaxy Milkshake",            ar: "ميلك شيك جالاكسي" },

  /* ── Frappes ── */
  "Classic Frappe":              { en: "Classic Frappe",              ar: "فرابيه كلاسيك" },
  "White Mocha Frappe":          { en: "White Mocha Frappe",          ar: "فرابيه وايت موكا" },
  "Mocha Frappe":                { en: "Mocha Frappe",                ar: "فرابيه موكا" },
  "Caramel Frappe":              { en: "Caramel Frappe",              ar: "فرابيه كراميل" },

  /* ── Frappuccino ── */
  "Caramel Frappuccino":         { en: "Caramel Frappuccino",         ar: "فرابيتشينو كراميل" },
  "Mocha Frappuccino":           { en: "Mocha Frappuccino",           ar: "فرابيتشينو موكا" },

  /* ── Matcha ── */
  "Iced Matcha":                 { en: "Iced Matcha",                 ar: "آيس ماتشا" },
  "Iced Mango Matcha":           { en: "Iced Mango Matcha",           ar: "آيس ماتشا بالمانجو" },
  "Iced Caramel Matcha":         { en: "Iced Caramel Matcha",         ar: "آيس ماتشا بالكراميل" },
  "Iced Strawberry Matcha":      { en: "Iced Strawberry Matcha",      ar: "آيس ماتشا بالفراولة" },
  "Iced Coconut Matcha":         { en: "Iced Coconut Matcha",         ar: "آيس ماتشا بجوز الهند" },
  "Hot Matcha":                  { en: "Hot Matcha",                  ar: "ماتشا ساخنة" },
  "Hot Honey Matcha":            { en: "Hot Honey Matcha",            ar: "ماتشا ساخنة بالعسل" },

  /* ── Boba ── */
  "Soft Passion Boba":           { en: "Soft Passion Boba",           ar: "بوبا باشن فروت" },
  "Soft Mango Boba":             { en: "Soft Mango Boba",             ar: "بوبا مانجو" },
  "Soft Blueberry Boba":         { en: "Soft Blueberry Boba",         ar: "بوبا توت أزرق" },
  "Soft Pineapple Boba":         { en: "Soft Pineapple Boba",         ar: "بوبا أناناس" },
  "Soft Strawberry Boba":        { en: "Soft Strawberry Boba",        ar: "بوبا فراولة" },
  "Blueberry Boba Milkshake":    { en: "Blueberry Boba Milkshake",    ar: "ميلك شيك بوبا توت أزرق" },
  "Mango Boba Milkshake":        { en: "Mango Boba Milkshake",        ar: "ميلك شيك بوبا مانجو" },
  "Strawberry Boba Milkshake":   { en: "Strawberry Boba Milkshake",   ar: "ميلك شيك بوبا فراولة" },
  "Passion Boba Milkshake":      { en: "Passion Boba Milkshake",      ar: "ميلك شيك بوبا باشن فروت" },
  "Peach Boba Milkshake":        { en: "Peach Boba Milkshake",        ar: "ميلك شيك بوبا خوخ" },
  "Mango Boba Smoothie":         { en: "Mango Boba Smoothie",         ar: "سموزي بوبا مانجو" },
  "Peach Boba Smoothie":         { en: "Peach Boba Smoothie",         ar: "سموزي بوبا خوخ" },
  "Strawberry Boba Smoothie":    { en: "Strawberry Boba Smoothie",    ar: "سموزي بوبا فراولة" },
  "Passion Boba Smoothie":       { en: "Passion Boba Smoothie",       ar: "سموزي بوبا باشن فروت" },
  "Blueberry Boba Smoothie":     { en: "Blueberry Boba Smoothie",     ar: "سموزي بوبا توت أزرق" },

  /* ── Mojitos ── */
  "Pink Lemonade Mojito":        { en: "Pink Lemonade Mojito",        ar: "موهيتو ليمون وردي" },
  "Blue Passion Mojito":         { en: "Blue Passion Mojito",         ar: "موهيتو باشن أزرق" },
  "Relief Black Mojito":         { en: "Relief Black Mojito",         ar: "موهيتو ريليف الأسود" },
  "Mixed Berry Mojito":          { en: "Mixed Berry Mojito",          ar: "موهيتو توت مشكل" },
  "Blueberry Mojito":            { en: "Blueberry Mojito",            ar: "موهيتو توت أزرق" },
  "Passion Fruit Mojito":        { en: "Passion Fruit Mojito",        ar: "موهيتو باشن فروت" },
  "Pineapple Mojito":            { en: "Pineapple Mojito",            ar: "موهيتو أناناس" },
  "Strawberry Mojito":           { en: "Strawberry Mojito",           ar: "موهيتو فراولة" },
  "Peach Mojito":                { en: "Peach Mojito",                ar: "موهيتو خوخ" },
  "Mango Mojito":                { en: "Mango Mojito",                ar: "موهيتو مانجو" },
  "Blue Curaçao Mojito":         { en: "Blue Curaçao Mojito",         ar: "موهيتو كوراساو الأزرق" },
  "Classic Mojito":              { en: "Classic Mojito",              ar: "موهيتو كلاسيك" },

  /* ── Fresh Juices ── */
  "Mango Juice":                 { en: "Mango Juice",                 ar: "عصير مانجو" },
  "Strawberry Juice":            { en: "Strawberry Juice",            ar: "عصير فراولة" },
  "Kiwi Juice":                  { en: "Kiwi Juice",                  ar: "عصير كيوي" },
  "Cantaloupe & Vanilla Juice":  { en: "Cantaloupe & Vanilla Juice",  ar: "عصير شمام وفانيليا" },
  "Banana Milk Juice":           { en: "Banana Milk Juice",           ar: "عصير موز بالحليب" },
  "Watermelon Juice":            { en: "Watermelon Juice",            ar: "عصير بطيخ" },
  "Watermelon & Vanilla Juice":  { en: "Watermelon & Vanilla Juice",  ar: "عصير بطيخ وفانيليا" },
  "Lemon Juice":                 { en: "Lemon Juice",                 ar: "عصير ليمون" },
  "Lemon Mint Juice":            { en: "Lemon Mint Juice",            ar: "عصير ليمون بالنعناع" },
  "Dates & Mixed Nuts Juice":    { en: "Dates & Mixed Nuts Juice",    ar: "عصير تمر بالمكسرات" },
  "Avocado Juice":               { en: "Avocado Juice",               ar: "عصير أفوكادو" },

  /* ── Ice Drinks ── */
  "Iced Americano":              { en: "Iced Americano",              ar: "آيس أمريكانو" },
  "Iced Latte":                  { en: "Iced Latte",                  ar: "آيس لاتيه" },
  "Iced Spanish Latte":          { en: "Iced Spanish Latte",          ar: "آيس سبانيش لاتيه" },
  "Iced Mocha":                  { en: "Iced Mocha",                  ar: "آيس موكا" },
  "Iced Caramel Macchiato":      { en: "Iced Caramel Macchiato",      ar: "آيس كراميل ماكياتو" },
  "Iced White Mocha":            { en: "Iced White Mocha",            ar: "آيس وايت موكا" },
  "Iced Tapioca Coffee":         { en: "Iced Tapioca Coffee",         ar: "آيس قهوة تابيوكا" },

  /* ── Smoothies ── */
  "Strawberry Smoothie":         { en: "Strawberry Smoothie",         ar: "سموزي فراولة" },
  "Kiwi Smoothie":               { en: "Kiwi Smoothie",               ar: "سموزي كيوي" },
  "Pineapple Smoothie":          { en: "Pineapple Smoothie",          ar: "سموزي أناناس" },
  "Mango Smoothie":              { en: "Mango Smoothie",              ar: "سموزي مانجو" },
  "Peach Smoothie":              { en: "Peach Smoothie",              ar: "سموزي خوخ" },
  "Blueberry Smoothie":          { en: "Blueberry Smoothie",          ar: "سموزي توت أزرق" },
  "Mixed Berry Smoothie":        { en: "Mixed Berry Smoothie",        ar: "سموزي توت مشكل" },
  "Green Apple Smoothie":        { en: "Green Apple Smoothie",        ar: "سموزي تفاح أخضر" },
  "Passion Fruit Smoothie":      { en: "Passion Fruit Smoothie",      ar: "سموزي باشن فروت" },
  "Lemon Mint Smoothie":         { en: "Lemon Mint Smoothie",         ar: "سموزي ليمون بالنعناع" },

  /* ── Soft Drinks ── */
  "Pepi Cola":                   { en: "Pepsi Cola",                  ar: "بيبسي كولا" },
  "7Up":                         { en: "7Up",                         ar: "سفن أب" },
  "Twist":                       { en: "Twist",                       ar: "تويست" },
  "Schweppes":                   { en: "Schweppes",                   ar: "شويبس" },
  "Red Bull ":                   { en: "Red Bull",                    ar: "ريد بول" },
  "Monster Energy":              { en: "Monster Energy",              ar: "مونستر إنرجي" },
  "Mineral Water":               { en: "Mineral Water",               ar: "مياه معدنية" },

  /* ── Desserts ── */
  "Chocolate Molten Cake":                  { en: "Chocolate Molten Cake",                  ar: "مولتن كيك شوكولاتة" },
  "Nutella Molten Cake":                    { en: "Nutella Molten Cake",                    ar: "مولتن كيك نوتيلا" },
  "Lotus Molten Cake":                      { en: "Lotus Molten Cake",                      ar: "مولتن كيك لوتس" },
  "Pistachio Molten Cake":                  { en: "Pistachio Molten Cake",                  ar: "مولتن كيك بيستاشيو" },
  "Nutella Cheesecake":                     { en: "Nutella Cheesecake",                     ar: "تشيز كيك نوتيلا" },
  "Lotus Cheesecake":                       { en: "Lotus Cheesecake",                       ar: "تشيز كيك لوتس" },
  "Caramel Cheesecake":                     { en: "Caramel Cheesecake",                     ar: "تشيز كيك كراميل" },
  "Strawberry Cheesecake":                  { en: "Strawberry Cheesecake",                  ar: "تشيز كيك فراولة" },
  "Blueberry Cheesecake":                   { en: "Blueberry Cheesecake",                   ar: "تشيز كيك بلوبيري" },
  "Mixed Berry Cheesecake":                 { en: "Mixed Berry Cheesecake",                 ar: "تشيز كيك ميكس بيري" },
  "Pistachio Cheesecake":                   { en: "Pistachio Cheesecake",                   ar: "تشيز كيك بيستاشيو" },
  "Nutella San Sebastián Cheesecake":        { en: "Nutella San Sebastián Cheesecake",        ar: "سان سيباستيان تشيز كيك نوتيلا" },
  "Lotus San Sebastián Cheesecake":          { en: "Lotus San Sebastián Cheesecake",          ar: "سان سيباستيان تشيز كيك لوتس" },
  "Caramel San Sebastián Cheesecake":        { en: "Caramel San Sebastián Cheesecake",        ar: "سان سيباستيان تشيز كيك كراميل" },
  "Pistachio San Sebastián Cheesecake":      { en: "Pistachio San Sebastián Cheesecake",      ar: "سان سيباستيان تشيز كيك بيستاشيو" },
  "Strawberry San Sebastián Cheesecake":     { en: "Strawberry San Sebastián Cheesecake",     ar: "سان سيباستيان تشيز كيك فراولة" },
  "Blueberry San Sebastián Cheesecake":      { en: "Blueberry San Sebastián Cheesecake",      ar: "سان سيباستيان تشيز كيك بلوبيري" },
  "Mixed Berry San Sebastián Cheesecake":    { en: "Mixed Berry San Sebastián Cheesecake",    ar: "سان سيباستيان تشيز كيك ميكس بيري" },
  "Tiramisu":                               { en: "Tiramisu",                               ar: "تيراميسو" },
  "Cookies":                                { en: "Cookies",                                ar: "كوكيز" },
  "Nutella Donut":                          { en: "Nutella Donut",                          ar: "دونات نوتيلا" },
  "Pistachio Donut":                        { en: "Pistachio Donut",                        ar: "دونات بيستاشيو" },
  "Lotus Donut":                            { en: "Lotus Donut",                            ar: "دونات لوتس" },
  "Nutella Croissant":                      { en: "Nutella Croissant",                      ar: "كرواسون نوتيلا" },
  "Pistachio Croissant":                    { en: "Pistachio Croissant",                    ar: "كرواسون بيستاشيو" },
  "Lotus Croissant":                        { en: "Lotus Croissant",                        ar: "كرواسون لوتس" },
  "San Sebastian":                          { en: "San Sebastian",                          ar: "سان سيباستيان" },
  "Chocolate Cheesecake":                   { en: "Chocolate Cheesecake",                   ar: "تشيز كيك شوكولاتة" },
  "Red Velvet Cake":                        { en: "Red Velvet Cake",                        ar: "كيك ريد فيلفيت" },
  "Russian Honey Cake":                     { en: "Russian Honey Cake",                     ar: "كيك العسل الروسي" },

  /* ── Specialty Coffee ── */
  "Hot V60":                     { en: "Hot V60",                     ar: "في60 ساخن" },
  "Iced V60":                    { en: "Iced V60",                    ar: "في60 مثلج" },
  "Cold Brew":                   { en: "Cold Brew",                   ar: "كولد برو" },

  /* ── Legacy / Alias Keys ── */
  "The Black Espresso":          { en: "The Black Espresso",          ar: "إسبريسو الأسود" },
  "Velvet Cappuccino":           { en: "Velvet Cappuccino",           ar: "كابوتشينو مخملي" },
  "San Sebastian Cheesecake":    { en: "San Sebastian Cheesecake",    ar: "تشيز كيك سان سيباستيان" },
  "Belgian Waffle":              { en: "Belgian Waffle",              ar: "وافل بلجيكي" }
};

/**
 * Renders the Extras panel dynamically using categoryData.extras into
 * the lightweight iOS glassmorphic list panel container.
 */
function renderExtrasPanel() {
  const container = document.querySelector('#panel-extra .extras-list');
  if (!container || !categoryData || !categoryData.extras) return;

  const isAr = currentLang === 'ar';

  container.innerHTML = categoryData.extras.map(item => {
    const name = isAr ? (item.nameAr || item.nameEn || item.name) : (item.nameEn || item.name);
    const desc = isAr ? (item.descAr || item.descEn || item.description) : (item.descEn || item.description);
    const priceVal = item.price ? item.price.replace(' EGP', '').replace('EGP', '').trim() : '';

    return `
      <div class="extra-item">
        <div class="extra-info">
          <div class="extra-name">${name}</div>
          ${desc ? `<div class="extra-description">${desc}</div>` : ''}
        </div>
        <div class="extra-price">
          <span class="price-unit">${isAr ? 'ج.م ' : 'EGP '}</span>${priceVal}
        </div>
      </div>
    `;
  }).join('');
}
window.renderExtrasPanel = renderExtrasPanel;

/* ── Dynamic Category Item Counts ─────────────────────────── */
/**
 * Counts the actual number of product items inside each panel.
 * - Standard panels use .menu-card
 * - The Extras panel uses categoryData.extras or .extra-item
 * Injects the count into .cat-card-count on the matching carousel card.
 */
function updateCategoryCounts() {
  const lang   = currentLang;
  const suffix = translations[lang]['items-suffix'];

  document.querySelectorAll('.cat-ring-card[data-tab]').forEach(card => {
    const tabId   = card.dataset.tab;
    const panel   = document.getElementById('panel-' + tabId);
    const countEl = card.querySelector('.cat-card-count');
    if (!panel || !countEl) return;

    // Extras uses categoryData.extras or .extra-item; all others use .menu-card
    const isExtras = tabId === 'extra';
    const count    = isExtras
      ? (categoryData && categoryData.extras ? categoryData.extras.length : panel.querySelectorAll('.extra-item').length)
      : panel.querySelectorAll('.menu-card').length;

    countEl.textContent = count + ' ' + suffix;
  });
}

/* ── Extras Panel — Staggered Entrance Animation ───────────── */
/**
 * When the extras panel becomes active (via carousel nav), trigger
 * a staggered slide-in animation on every .extra-item inside it.
 */
function animateExtrasPanel() {
  const panel = document.getElementById('panel-extra');
  if (!panel) return;

  const items = panel.querySelectorAll('.extra-item');
  items.forEach((item, i) => {
    item.style.opacity    = '0';
    item.style.transform  = 'translateX(-20px)';
    item.style.transition = 'none';
    // Force reflow
    void item.offsetWidth;
    item.style.transition = `opacity 0.5s ease ${i * 60}ms, transform 0.5s cubic-bezier(0.25, 1, 0.5, 1) ${i * 60}ms`;
    item.style.opacity    = '1';
    item.style.transform  = 'translateX(0)';
  });
}
window.animateExtrasPanel = animateExtrasPanel;

/* ── Language Toggle Logic ─────────────────────────────────── */
function applyTranslations(lang) {
  const t = translations[lang];
  const isRTL = lang === 'ar';

  // 1. Update data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });

  // 2. Update carousel card titles
  document.querySelectorAll('.cat-ring-card[data-tab]').forEach(card => {
    const tabId = card.dataset.tab;
    const catObj = categories.find(c => c.id === tabId);
    const titleEl = card.querySelector('.cat-card-title');
    if (titleEl) {
      if (catObj) {
        titleEl.textContent = isRTL ? catObj.nameAr : catObj.nameEn;
      } else if (t['cat-' + tabId]) {
        titleEl.textContent = t['cat-' + tabId];
      }
    }
  });

  // 3. Update DOM product names in .card-name
  document.querySelectorAll('.card-name').forEach(nameEl => {
    const text = nameEl.textContent.trim();
    if (!nameEl.dataset.nameEn) {
      nameEl.dataset.nameEn = text;
    }
    const origEn = nameEl.dataset.nameEn;
    const match = productNameMap[origEn];
    if (match) {
      nameEl.textContent = isRTL ? match.ar : match.en;
    }
  });

  // 4. Re-render Extras panel
  renderExtrasPanel();

  // 5. Re-inject counts with correct language suffix
  updateCategoryCounts();

  // 6. Update html lang + dir
  document.documentElement.lang = isRTL ? 'ar' : 'en';
  document.documentElement.dir  = isRTL ? 'rtl' : 'ltr';

  // 7. Update toggle button label
  const labelEl = document.getElementById('langLabel');
  if (labelEl) labelEl.textContent = isRTL ? 'EN' : 'AR';
}

function initLangToggle() {
  const btn = document.getElementById('langToggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    // Animate label flip
    btn.classList.add('switching');

    setTimeout(() => {
      currentLang = currentLang === 'en' ? 'ar' : 'en';
      applyTranslations(currentLang);
      btn.classList.remove('switching');
    }, 220);
  });
}

/* ── Loader ───────────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 1000);
    }
  }, 2800);
});

/* ── Custom Cursor ────────────────────────────────────────── */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  }
});

// Smooth ring follow animation
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  if (cursorRing) {
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
  }
  requestAnimationFrame(animateRing);
}
animateRing();

// Show/hide cursor when mouse enters/leaves the window
document.addEventListener('mouseenter', () => {
  if (cursor) cursor.style.opacity = '1';
  if (cursorRing) cursorRing.style.opacity = '1';
});
document.addEventListener('mouseleave', () => {
  if (cursor) cursor.style.opacity = '0';
  if (cursorRing) cursorRing.style.opacity = '0';
});

// Cursor expand hover effect on interactive elements via event delegation
document.addEventListener('mouseover', e => {
  const target = e.target.closest('a, button, .cat-pill, .sig-card, .offer-card, .g-item, .review-card, .soc-btn, .menu-tab-btn, .rv-btn');
  if (target) {
    document.body.classList.add('cursor-expand');
  } else {
    document.body.classList.remove('cursor-expand');
  }
});

/* ── Navbar Scroll Style ──────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
}, { passive: true });

/* ── Mobile Menu ──────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

hamburger?.addEventListener('click', () => {
  if (mobileMenu) {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
});

mobileClose?.addEventListener('click', closeMobile);

function closeMobile() {
  if (mobileMenu) {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
}
window.closeMobile = closeMobile; // Make globally accessible

/* ── Scroll Reveal ────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal, .reveal-l, .reveal-r, .reveal-s');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('vis');
      }, parseInt(delay));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ── Animated Counters ────────────────────────────────────── */
const counters = document.querySelectorAll('[data-target]');

function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = target >= 1000
      ? Math.floor(current).toLocaleString() + '+'
      : Math.floor(current) + (target === 99 ? '%' : '');
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));

/* ── Category Pills — Dynamic Lighting ────────────────────── */
document.querySelectorAll('.cat-pill').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
    const my = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
    card.style.setProperty('--mx', mx + '%');
    card.style.setProperty('--my', my + '%');
  });
});

/* ── Interactive Story Timeline ───────────────────────────── */
function activateTL(el) {
  document.querySelectorAll('.tl-item').forEach(item => item.classList.remove('active'));
  el.classList.add('active');
}
window.activateTL = activateTL; // Make globally accessible

/* ── 3D Ring / Coverflow Carousel Physics & Interaction ─────── */
let catCarouselState = {
  activeIndex: 0,
  isDragging: false,
  startX: 0,
  dragDx: 0,
  cards: [],
  container: null,
  ringTrack: null
};

function initCatCarousel3D() {
  const container = document.getElementById('catCarousel3D');
  const ringTrack = document.getElementById('catRingTrack');
  if (!container || !ringTrack) return;

  const cards = Array.from(ringTrack.querySelectorAll('.cat-ring-card'));
  if (!cards.length) return;

  catCarouselState.container = container;
  catCarouselState.ringTrack = ringTrack;
  catCarouselState.cards = cards;

  // Position cards initially
  updateCatCarouselTransforms(0);

  // Prev & Next Nav Buttons
  const prevBtn = document.getElementById('catNavPrev');
  const nextBtn = document.getElementById('catNavNext');

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateCatCarousel(-1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateCatCarousel(1);
    });
  }

  // Click card to center
  cards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      if (Math.abs(catCarouselState.dragDx) > 10) return; // ignore click if drag active
      setCatCarouselIndex(index);
    });
  });

  // Mouse & Touch Drag Interaction
  setupCatCarouselEvents(ringTrack);
}

function updateCatCarouselTransforms(dragOffset = 0) {
  const { cards, activeIndex } = catCarouselState;
  const count = cards.length;
  if (!count) return;

  const isMobile = window.innerWidth <= 768;
  const spacing = isMobile ? 130 : 185;

  cards.forEach((card, index) => {
    let rawOffset = index - activeIndex;
    
    // Circular ring offset wrapping
    if (rawOffset > count / 2) rawOffset -= count;
    if (rawOffset < -count / 2) rawOffset += count;

    const effectiveOffset = rawOffset + dragOffset;
    const absOffset = Math.abs(effectiveOffset);

    if (absOffset < 0.08) {
      // Active center category
      card.className = 'cat-ring-card active';
      card.style.transform = `perspective(1000px) translate3d(0, 0, 50px) scale(1.1)`;
      card.style.opacity = '1';
      card.style.filter = 'blur(0px)';
      card.style.zIndex = '20';
    } else {
      // Non-active categories: Rotate dynamically back into 3D space
      card.className = 'cat-ring-card';
      const dir = effectiveOffset > 0 ? 1 : -1;
      const rotY = dir * -35; // rotateY(-35deg)
      const posX = effectiveOffset * spacing;
      const posZ = -180 - Math.min(absOffset * 40, 100);
      const scale = Math.max(0.8 - (absOffset - 1) * 0.1, 0.65);
      const opacity = Math.max(0.65 - (absOffset - 1) * 0.25, 0.2);
      const blur = Math.min(1 + (absOffset - 1) * 1.5, 3);

      card.style.transform = `perspective(1000px) translate3d(${posX.toFixed(1)}px, 0, ${posZ.toFixed(1)}px) rotateY(${rotY}deg) scale(${scale.toFixed(2)})`;
      card.style.opacity = opacity.toFixed(2);
      card.style.filter = `blur(${blur.toFixed(1)}px)`;
      card.style.zIndex = Math.max(10 - Math.round(absOffset * 2), 1).toString();
    }
  });
}

function setCatCarouselIndex(targetIndex) {
  const count = catCarouselState.cards.length;
  if (!count) return;

  catCarouselState.activeIndex = (targetIndex + count) % count;
  catCarouselState.dragDx = 0;
  updateCatCarouselTransforms(0);

  const activeCard = catCarouselState.cards[catCarouselState.activeIndex];
  if (activeCard) {
    const tabId = activeCard.dataset.tab;
    if (tabId) switchMenuPanelOnly(tabId, activeCard);
  }
}

function navigateCatCarousel(direction) {
  setCatCarouselIndex(catCarouselState.activeIndex + direction);
}

function switchMenuPanelOnly(tabId, activeCard) {
  document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.cat-ring-card').forEach(c => c.classList.remove('active'));

  const panel = document.getElementById('panel-' + tabId);
  if (panel) {
    panel.classList.add('active');
    
    if (tabId === 'extra') {
      animateExtrasPanel();
    } else {
      panel.querySelectorAll('.menu-card').forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
          card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, border-color 0.4s ease, box-shadow 0.5s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 80);
      });
    }
  }

  if (activeCard) activeCard.classList.add('active');
}

function switchMenu(tabId, btn) {
  const cardIndex = catCarouselState.cards.findIndex(c => c.dataset.tab === tabId);
  if (cardIndex !== -1) {
    setCatCarouselIndex(cardIndex);
  } else {
    switchMenuPanelOnly(tabId, btn);
  }
}
window.switchMenu = switchMenu;

function scrollToMenuTab(tabId) {
  const menuSec = document.getElementById('menu');
  if (menuSec) {
    menuSec.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      switchMenu(tabId, null);
    }, 600);
  }
}
window.scrollToMenuTab = scrollToMenuTab;

function setupCatCarouselEvents(el) {
  let isDown = false;
  let startX = 0;

  const onStart = (clientX) => {
    isDown = true;
    startX = clientX;
    catCarouselState.dragDx = 0;
    catCarouselState.cards.forEach(c => c.style.transition = 'none');
  };

  const onMove = (clientX) => {
    if (!isDown) return;
    const dx = clientX - startX;
    catCarouselState.dragDx = dx;
    const isMobile = window.innerWidth <= 768;
    const spacing = isMobile ? 130 : 185;
    const dragOffset = dx / spacing;
    updateCatCarouselTransforms(dragOffset);
  };

  const onEnd = () => {
    if (!isDown) return;
    isDown = false;
    catCarouselState.cards.forEach(c => {
      c.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), filter 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.6s cubic-bezier(0.25, 1, 0.5, 1), background 0.4s ease, border-color 0.4s ease';
    });

    const isMobile = window.innerWidth <= 768;
    const threshold = isMobile ? 30 : 45;

    if (catCarouselState.dragDx < -threshold) {
      navigateCatCarousel(1);
    } else if (catCarouselState.dragDx > threshold) {
      navigateCatCarousel(-1);
    } else {
      updateCatCarouselTransforms(0);
    }
    
    setTimeout(() => { catCarouselState.dragDx = 0; }, 100);
  };

  el.addEventListener('mousedown', e => onStart(e.clientX));
  window.addEventListener('mousemove', e => onMove(e.clientX));
  window.addEventListener('mouseup', () => onEnd());

  el.addEventListener('touchstart', e => {
    if (e.touches.length) onStart(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', e => {
    if (e.touches.length) onMove(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => onEnd());

  window.addEventListener('resize', () => {
    updateCatCarouselTransforms(0);
  });
}

function initCategorySwiper() {
  initCatCarousel3D();
}
window.initCategorySwiper = initCategorySwiper;




/* ── Parallax Effects ─────────────────────────────────────── */
const heroBg = document.querySelector('.hero-img-bg');
const pbBg = document.getElementById('pbBg');
const parallaxBanner = document.getElementById('parallaxBanner');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;

  // Hero Parallax
  if (heroBg && scrolled < window.innerHeight) {
    heroBg.style.transform = `scale(1.06) translateY(${scrolled * 0.3}px)`;
  }

  // Banner Parallax
  if (pbBg && parallaxBanner) {
    const rect = parallaxBanner.getBoundingClientRect();
    const winHeight = window.innerHeight;
    if (rect.top < winHeight && rect.bottom > 0) {
      const relativeScroll = (winHeight - rect.top) / (winHeight + rect.height);
      const yOffset = (relativeScroll - 0.5) * 80;
      pbBg.style.transform = `translateY(${yOffset}px) scale(1.15)`;
    }
  }
}, { passive: true });

/* ── Back to Top Button ───────────────────────────────────── */
const backTop = document.getElementById('back-top');
window.addEventListener('scroll', () => {
  if (backTop) {
    backTop.classList.toggle('vis', window.scrollY > 400);
  }
}, { passive: true });

backTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── Card Tilt Effect — subtle for light theme ───────────── */
document.querySelectorAll('.menu-card, .sig-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width  / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `translateY(-6px) rotateX(${(-dy * 3).toFixed(1)}deg) rotateY(${(dx * 3).toFixed(1)}deg)`;
  });
  card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── Newsletter Feedback ──────────────────────────────────── */
document.querySelector('.nl-btn')?.addEventListener('click', function() {
  const input = document.querySelector('.nl-input');
  if (input?.value) {
    this.textContent = '✓';
    this.style.background = 'linear-gradient(135deg, #2d6b30, #3a8b40)';
    input.value = '';
    input.placeholder = 'Thank you! You\'re subscribed.';
    setTimeout(() => {
      this.textContent = '→';
      this.style.background = '';
      input.placeholder = 'Your email address';
    }, 3000);
  }
});

/* ── Smooth Navigation Scroll ─────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      closeMobile();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ── Smooth Active Nav Link Highlight ─────────────────────── */
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--caramel)';
        }
      });
    }
  });
}, { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ── Init Page State ──────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  // 1. Load saved language from localStorage (default: 'en')
  const savedLang = localStorage.getItem('relief-lang') || 'en';
  currentLang = savedLang;

  // 2. Render extras panel before translations so data exists
  renderExtrasPanel();

  // 3. Init carousel (builds DOM nodes that translations will target)
  initCatCarousel3D();

  // 4. Apply full translations for the saved language immediately
  applyTranslations(currentLang);

  // 5. Update item counts with the correct language suffix
  updateCategoryCounts();

  // 6. Wire up the language toggle button
  initLangToggle();
});

/* ── Save Language on Toggle ──────────────────────────────── */
// Patch initLangToggle to also persist the choice
const _origInitLangToggle = initLangToggle;
function initLangToggle() {
  const btn = document.getElementById('langToggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    btn.classList.add('switching');
    setTimeout(() => {
      currentLang = currentLang === 'en' ? 'ar' : 'en';
      localStorage.setItem('relief-lang', currentLang);
      applyTranslations(currentLang);
      btn.classList.remove('switching');
    }, 220);
  });
}

/* ── Menu Card Event Delegation — DISABLED ─────────────────── */
// Product card click → modal behavior has been completely removed.
// Cards are now display-only; pointer-events and cursor are set to default in CSS.
