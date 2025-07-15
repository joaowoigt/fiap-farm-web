// Jest setup file

// Import testing library matchers
require("@testing-library/jest-dom");

// Mock Firebase to avoid real connections during tests
jest.mock("firebase/app", () => ({
  getApps: jest.fn(() => []),
  initializeApp: jest.fn(() => ({
    _getProvider: jest.fn(() => ({
      getImmediate: jest.fn(() => ({})),
    })),
  })),
  getApp: jest.fn(() => ({
    _getProvider: jest.fn(() => ({
      getImmediate: jest.fn(() => ({})),
    })),
  })),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({})),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(() => ({})),
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
}));

// Mock browser environment
Object.defineProperty(window, "location", {
  value: {
    hostname: "localhost",
  },
});

// Mock sessionStorage
const mockSessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, "sessionStorage", {
  value: mockSessionStorage,
});

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

// Mock Next.js router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "/",
      query: "",
      asPath: "",
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    };
  },
}));

// Mock Next.js navigation
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return "/";
  },
}));

// Mock Chart.js
jest.mock("chart.js", () => ({
  Chart: {
    register: jest.fn(),
  },
  CategoryScale: jest.fn(),
  LinearScale: jest.fn(),
  BarElement: jest.fn(),
  Title: jest.fn(),
  Tooltip: jest.fn(),
  Legend: jest.fn(),
}));

// Mock react-chartjs-2
jest.mock("react-chartjs-2", () => ({
  Bar: function Bar() {
    return require("react").createElement(
      "div",
      { "data-testid": "bar-chart" },
      "Bar Chart"
    );
  },
  Line: function Line() {
    return require("react").createElement(
      "div",
      { "data-testid": "line-chart" },
      "Line Chart"
    );
  },
  Pie: function Pie() {
    return require("react").createElement(
      "div",
      { "data-testid": "pie-chart" },
      "Pie Chart"
    );
  },
}));

// Mock @repo/ui components
jest.mock("@repo/ui/dropdown", () => ({
  ProductionType: {
    crops: "crops",
    livestock: "livestock",
    dairy: "dairy",
  },
  GoalType: {
    sales: "sales",
    production: "production",
  },
}));

jest.mock("@repo/ui/texts", () => ({
  Text: function Text(props) {
    return require("react").createElement(
      "span",
      { "data-testid": "text" },
      props.text
    );
  },
}));

jest.mock("@repo/ui/buttons", () => ({
  Button: function Button(props) {
    return require("react").createElement(
      "button",
      {
        "data-testid": "button",
        onClick: props.onClick,
      },
      props.children
    );
  },
}));

// Global test timeout
jest.setTimeout(30000);
