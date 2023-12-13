import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const LANGUAGES = [
  { label: "English", code: "en" },
  { label: "Polish", code: "pl" }
];

export const onChangeLang = (e: React.ChangeEvent<HTMLInputElement>) => {
  const lang_code = e.target.value;
  i18n.changeLanguage(lang_code);
};

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  },
  resources: {
    en: {
      translation: {
        title: "A healthy lifestyle starts with calorie counting",
        homeText: "Get in shape - track your calories with us",
        goToApp: "Go to App",
        navApp: "Application",
        navProductBase: "Products Base",
        daysOfTheWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        nutritionalValues: "Nutritional values per 100g",
        energyValue: "Energy value",
        proteins: "Proteins",
        fats: "Fats",
        carbohydrates: "Carbohydrates",
        editProduct: "Edit product",
        save: "Save",
        cancel: "Cancel",
        deleteProduct: "Delete product",
        addProduct: "Add product",
        amount: "Amount",
        addToList: "Add to list",
        emptyList: "No products on the list",
        login: "Login",
        logout: "Logout",
        logging: "Logging",
        registration: "Registration",
        username: "Username",
        password: "Password",
        confirmPassword: "Confirm Password",
        passwordDigits: "Password must contain digits",
        passwordUpperCase: "Password must contain capital letters",
        passwordLowerCase: "Password must contain lowercase letters",
        passwordSpecialChar:
          "Password must contain the special character @$!%*?&",
        passwordLength: "Password must contain min. 6 characters",
        productName: "Product name",
        addNewProduct: "Add new product",
        loginToAdd: "Login to add new product",
        profileTitle: "Hello, ",
        sex: "Sex",
        male: "Male",
        female: "Female",
        other: "Other",
        activity: "Physical activity",
        low: "Low",
        medium: "Medium",
        high: "High",
        age: "Age",
        height: "Height",
        weight: "Weight",
        needs: "Your caloric needs are ",
        breakfast: "Breakfast",
        secondBreakfast: "Second Breakfast",
        dinner: "Dinner",
        lunch: "Lunch",
        supper: "Supper",
        summary: "Summary"
      }
    },
    pl: {
      translation: {
        title: "Zdrowe życie zaczyna się od liczenia kalorii",
        homeText: "Zadbaj o formę - śledź z nami kalorie",
        goToApp: "Przejdź do aplikacji",
        navApp: "Aplikacja",
        navProductBase: "Baza produktów",
        daysOfTheWeek: ["Nd", "Pon", "Wt", "Śr", "Czw", "Pt", "Sb"],
        nutritionalValues: "Wartości odżywcze na 100g",
        energyValue: "Wartość energetyczna",
        proteins: "Białko",
        fats: "Tłuszcze",
        carbohydrates: "Węglowodany",
        editProduct: "Edytuj produkt",
        save: "Zapisz",
        cancel: "Anuluj",
        deleteProduct: "Usuń produkt",
        addProduct: "Dodaj produkt",
        amount: "Ilość",
        addToList: "Dodaj do listy",
        emptyList: "Brak produktów",
        login: "Zaloguj się",
        logout: "Wyloguj się",
        logging: "Logowanie",
        registration: "Rejestracja",
        username: "Nazwa użytkownika",
        password: "Hasło",
        confirmPassword: "Potwierdź hasło",
        passwordDigits: "Hasło musi zawierać cyfry",
        passwordUpperCase: "Hasło musi zawierać wielkie litery",
        passwordLowerCase: "Hasło musi zawierać małe litery",
        passwordSpecialChar: "Hasło musi zawierać znak specjalny @$!%*?&",
        passwordLength: "Hasło musi zawierać min. 6 znaków",
        productName: "Nazwa produktu",
        addNewProduct: "Dodaj nowy produkt",
        loginToAdd: "Zaloguj się, aby dodać nowy produkt",
        profileTitle: "Witaj, ",
        sex: "Płeć",
        male: "Mężczyzna",
        female: "Kobieta",
        other: "Inna",
        activity: "Aktywność fizyczna",
        low: "Niska",
        medium: "Średnia",
        high: "Wysoka",
        age: "Wiek",
        height: "Wzrost",
        weight: "Waga",
        needs: "Twoje zapotrzebowanie kaloryczne wynosi ",
        breakfast: "Śniadanie",
        secondBreakfast: "Drugie śniadanie",
        dinner: "Obiad",
        lunch: "Lunch",
        supper: "Kolacja",
        summary: "Podsumowanie"
      }
    }
  }
});

export default i18n;
