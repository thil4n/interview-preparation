1. What is React?

React is a JavaScript library developed by Facebook for building user interfaces, especially single-page applications.
It allows developers to create reusable UI components and manage the state of those components efficiently.

2. What are the main features of React?

Virtual DOM: Optimizes rendering by updating only the parts of the DOM that have changed.
Component-Based Architecture: Encourages reusable UI components.
Unidirectional Data Flow: Makes code predictable and easier to debug.
JSX: A syntax extension that allows mixing HTML with JavaScript.

3. What is JSX?

JSX stands for JavaScript XML. It is a syntax extension for JavaScript, allowing developers to write HTML-like code within JavaScript.
React converts JSX into JavaScript during the build process.

4. What is the Virtual DOM?

The Virtual DOM is a lightweight representation of the real DOM. React keeps a Virtual DOM in memory,
compares it with the previous version (diffing), and updates only the changed parts in the real DOM, improving performance.

5. Explain the difference between a class component and a functional component.

Class Component: Requires `extends React.Component`. Can use lifecycle methods and `state`.
Functional Component: A plain JavaScript function that returns JSX. With React Hooks,
functional components can now manage state and use lifecycle features.

6. What are React Hooks?

React Hooks are functions that let you use state and other React features in functional components. Common hooks include:
`useState`: For state management.
`useEffect`: For side effects (similar to lifecycle methods like `componentDidMount`).
`useContext`: For accessing context.
`useRef`: For accessing DOM elements or persisting mutable values.

7. What is the difference between `state` and `props`?
   Props: Used to pass data from a parent component to a child component. They are immutable.
   State: Managed within the component. It is mutable and determines the component's behavior and rendering.

8. What is the purpose of `useEffect`?

`useEffect` is used to handle side effects in functional components, such as data fetching,
subscriptions, or manually manipulating the DOM.
It can mimic lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.

9. How does React handle form inputs?

React handles form inputs using controlled or uncontrolled components:
Controlled Components: The form element's value is controlled by React state.
Uncontrolled Components: The form element's value is controlled by the DOM itself using `ref`.

10. What is `React.memo`?
    `React.memo` is a higher-order component used to optimize functional components by preventing unnecessary re-renders.
    It performs a shallow comparison of props and re-renders the component only if the props have changed.

11. What is the difference between `Context API` and `Redux`?

Context API: A built-in React feature for managing state globally. It is simpler but better suited for less complex applications.
Redux: A state management library with a more complex but powerful architecture.
It is suited for large-scale applications with complex state logic.

12. What is the purpose of `useReducer`? How does it differ from `useState`?

    `useReducer` is an alternative to `useState` for managing complex state logic.
    It accepts a reducer function and an initial state and returns the current state and a dispatch function.
    It is similar to Redux but works locally within a component.

13. What are Higher-Order Components (HOCs)?

    HOCs are functions that take a component as an argument and return a new component.
    They are used to add functionality to existing components.
    Common use cases include authentication checks and conditional rendering.

14. What is the purpose of React Portals?

    React Portals allow you to render children into a DOM node that exists outside the DOM hierarchy of the parent component.
    They are useful for rendering modals, tooltips, and other UI elements that need to break out of their parent container.

15. How does React handle error boundaries?
    Error boundaries are React components that catch JavaScript errors in their child component tree and log those errors, providing a fallback UI.
    They are created by implementing `componentDidCatch` and `getDerivedStateFromError`.

16. What is lazy loading in React?

    Lazy loading in React refers to loading components or assets only when they are required.
    This improves the performance and initial loading time of the application.
    React provides `React.lazy` and `Suspense` to implement lazy loading.

17. How do you optimize React application performance?

    Use `React.memo` for functional components.
    Use `useCallback` and `useMemo` to memoize functions and values.
    Avoid unnecessary re-renders by lifting state up or using context wisely.
    Code-splitting and lazy loading for components.
    Use production build for deployment.

18. What is the purpose of `reconciliation` in React?
    Reconciliation is the process by which React updates the DOM by comparing the current Virtual
    DOM with the previous version and determining the minimum number of changes required.

19. What is React Router?

    React Router is a standard library for routing in React.
    It allows navigation between different components or pages in a single-page application.
    Key components include `BrowserRouter`, `Route`, `Switch`, `Link`, and `NavLink`.

20. What is the role of `react-query` or `TanStack Query`?
    `react-query` is a powerful data-fetching library for managing server-side state in React applications.
    It simplifies data fetching, caching, and synchronization with the server,
    providing features like automatic retries, pagination, and background data updates.

21. What is the difference between `findDOMNode` and `ref`?  
    `findDOMNode`: A legacy method used to get the DOM node associated with a component. It is discouraged in React 16+.
    `ref`: The modern way to directly access a DOM node or React element. Created using `React.createRef` or `useRef`.

22. What is the purpose of `StrictMode` in React?  
    `StrictMode` is a tool for highlighting potential problems in an application. It activates additional checks and warnings for its descendants:
    Detects unexpected side effects.
    Identifies deprecated lifecycle methods.
    Warns about usage of legacy API patterns.

23. Explain the `key` prop in React. Why is it important?  
    The `key` prop is used by React to identify which elements have changed, are added, or are removed.
    It helps in efficient reconciliation and prevents unnecessary re-renders. Each element in a list should have a unique `key` to ensure stability.

24. How does `PropTypes` help in React?  
    `PropTypes` is a runtime type-checking tool used to validate the props passed to a component.
    It ensures that components receive props of the correct type and raises warnings during development if the validation fails.

import PropTypes from 'prop-types';

MyComponent.propTypes = {
name: PropTypes.string.isRequired,
age: PropTypes.number,
};

25. What is the difference between `React.Fragment` and `<>`?  
    Both `React.Fragment` and `<>` (short syntax) allow grouping of multiple elements without adding extra nodes to the DOM.
    The short syntax (`<>`) is a shorthand for `React.Fragment`.

<React.Fragment>

  <h1>Hello</h1>
  <p>World</p>
</React.Fragment>

<>

  <h1>Hello</h1>
  <p>World</p>
</>

26. What is server-side rendering (SSR) in React?  
    SSR is the process of rendering React components on the server and sending the fully rendered HTML to the client.
    This improves performance and SEO by reducing the time to first content ful paint.
    Frameworks like Next.js support SSR.

27. What is hydration in React?  
    Hydration is the process of attaching event listeners and restoring the application
    state to a server-rendered React application on the client side.
    This makes the static content interactive.

28. How do you manage side effects in React apart from `useEffect`?  
    Apart from `useEffect`, you can manage side effects using:
    Custom Hooks: Encapsulate reusable logic.
    State Management Libraries: Redux middleware like `redux-thunk` or `redux-saga`.
    React Query: Handles data fetching with caching and synchronization.

29. What is `forwardRef` in React?  
    `React.forwardRef` is used to pass a `ref` through a component to one of its child components.
    It’s commonly used for higher-order components and when working with custom input components.

const MyInput = React.forwardRef((props, ref) => (
<input ref={ref} {...props} />
));

30. What is the purpose of `Suspense` in React?  
    `Suspense` is a component that lets you “wait” for some code to load or a data request to complete.
    It’s often used with `React.lazy` for lazy-loaded components or libraries like `react-query`.

<Suspense fallback={<div>Loading...</div>}>
<LazyComponent />
</Suspense>

31. What is the difference between `Switch` and `Routes` in React Router v6?  
    `Switch`: Used in React Router v5 to render only the first route that matches.
    `Routes`: Introduced in React Router v6, works similarly to `Switch` but has a simpler syntax and supports nested routing.

32. How does `useTransition` improve user experience in React?  
    `useTransition` is a React hook that allows marking updates as non-urgent.
    It keeps the interface responsive during state transitions by rendering a fallback UI while waiting for the transition to complete.

33. What is `Recoil` in React?  
    `Recoil` is a state management library for React applications.
    It provides a way to manage shared state across components with better performance than Context API for large applications.

What is React Virtual Dom
react stateless componet
what is redux
Why did React gain more popularity over the years?
What are the hooks in React
What hook can u use to call external API
How do u implement useEffect
How can u pass the data between components
What is redux
Is there alternatives to redux and what are they
Why we use redux instead of the others
What is the latest version of React
Practice DOM manipulation before doing the assessment (Event binding, removing and adding nodes, changing html attrivutes, etc)
React promises
Questions about react
What is the difference between VueJS and ReactJS
What is a Single Page Application - SPA
What React Virtual DOM
Asked about react hooks, state,
Compare Angular vs React
What are the frontend techs u have used
Then some questions on angular (featues,components,command for create component)
Some questions on react(advantages,virtual DOM,Real DOM , functional and class component)
