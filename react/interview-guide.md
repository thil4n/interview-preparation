# React Interview Guide

## React Fundamentals

### What is React?

React is a JavaScript library for building user interfaces using components. It follows a component-based, declarative approach where you describe what the UI should look like.

### Key Concepts

1. **Components**: Reusable pieces of UI
2. **JSX**: Syntax extension allowing HTML-like code in JavaScript
3. **State**: Data that changes over time
4. **Props**: Data passed from parent to child
5. **Virtual DOM**: In-memory representation of actual DOM

## Components

### Functional Components (Modern)

```jsx
function Greeting(props) {
    return <h1>Hello, {props.name}!</h1>;
}

// Or with arrow function
const Greeting = (props) => {
    return <h1>Hello, {props.name}!</h1>;
};

// Or with destructuring
const Greeting = ({ name }) => <h1>Hello, {name}!</h1>;
```

### Class Components (Legacy)

```jsx
class Greeting extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}!</h1>;
    }
}
```

### Functional Components vs Class Components

| Feature | Functional | Class |
|---------|-----------|-------|
| Hooks support | Yes | No |
| State management | Hooks | this.state |
| Lifecycle | useEffect hook | Lifecycle methods |
| Performance | Slightly better | Slightly heavier |
| Readability | Simpler | More verbose |
| Modern | Yes | Legacy |

## Props vs State

### Props

- Data passed from parent to child
- Read-only (immutable)
- Used to pass data down the component tree

```jsx
function Parent() {
    return <Child name="John" age={25} />;
}

function Child({ name, age }) {
    return <div>{name} is {age} years old</div>;
}
```

### State

- Data managed within a component
- Can be changed (mutable)
- Component re-renders when state changes

```jsx
function Counter() {
    const [count, setCount] = React.useState(0);
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    );
}
```

## Hooks

### useState

Manage component state in functional components.

```jsx
const [count, setCount] = useState(0);
// count: current state value
// setCount: function to update state
```

### useEffect

Perform side effects (API calls, subscriptions, DOM manipulation).

```jsx
useEffect(() => {
    // Run after render
    console.log("Component mounted or updated");
    
    return () => {
        // Cleanup (runs before component unmounts)
        console.log("Cleanup");
    };
}, [dependency1, dependency2]);  // Dependency array
```

Dependency array:
- Empty `[]`: Run once after mount
- No array: Run after every render
- `[deps]`: Run when dependencies change

### useContext

Access context without prop drilling.

```jsx
const ThemeContext = React.createContext("light");

function App() {
    return (
        <ThemeContext.Provider value="dark">
            <Child />
        </ThemeContext.Provider>
    );
}

function Child() {
    const theme = useContext(ThemeContext);
    return <div>Theme: {theme}</div>;
}
```

### useReducer

Complex state management alternative to useState.

```jsx
const initialState = { count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case "INCREMENT":
            return { count: state.count + 1 };
        case "DECREMENT":
            return { count: state.count - 1 };
        default:
            return state;
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    return (
        <div>
            Count: {state.count}
            <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
            <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
        </div>
    );
}
```

### useRef

Access DOM elements directly or store mutable values.

```jsx
function TextInput() {
    const inputRef = useRef(null);
    
    const handleClick = () => {
        inputRef.current.focus();
    };
    
    return (
        <>
            <input ref={inputRef} />
            <button onClick={handleClick}>Focus</button>
        </>
    );
}
```

### useCallback

Memoize function to avoid unnecessary re-renders of children.

```jsx
function Parent() {
    const [count, setCount] = useState(0);
    
    const handleClick = useCallback(() => {
        setCount(c => c + 1);
    }, []);  // Only recreate if dependencies change
    
    return <Child onClick={handleClick} />;
}
```

### useMemo

Memoize expensive computation results.

```jsx
function Component({ count }) {
    const expensiveValue = useMemo(() => {
        return fibonacci(count);  // Only recompute if count changes
    }, [count]);
    
    return <div>{expensiveValue}</div>;
}
```

## Rendering

### Conditional Rendering

```jsx
// If-else
function Greeting({ isLoggedIn }) {
    if (isLoggedIn) {
        return <h1>Welcome back!</h1>;
    }
    return <h1>Please sign in.</h1>;
}

// Ternary operator
<div>
    {isLoggedIn ? <h1>Welcome!</h1> : <h1>Sign in</h1>}
</div>

// Logical AND (render if true)
{isLoggedIn && <h1>Welcome!</h1>}

// Switch for multiple conditions
{(() => {
    switch(type) {
        case "success": return <SuccessMsg />;
        case "error": return <ErrorMsg />;
        default: return null;
    }
})()}
```

### Lists and Keys

```jsx
function List({ items }) {
    return (
        <ul>
            {items.map((item) => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    );
}

// Why keys matter:
// - Help React identify which items have changed
// - Don't use index as key (can cause issues)
// - Use unique, stable identifier (id)
```

## Forms

```jsx
function Form() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />
            <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
            />
            <button type="submit">Send</button>
        </form>
    );
}
```

## Performance Optimization

### React.memo

Prevent unnecessary re-renders of child components.

```jsx
const Child = React.memo(({ name }) => {
    console.log("Child rendered");
    return <div>{name}</div>;
});

function Parent() {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <Child name="John" />  // Won't re-render if name doesn't change
            <button onClick={() => setCount(count + 1)}>Count: {count}</button>
        </div>
    );
}
```

### Code Splitting

```jsx
import React, { Suspense, lazy } from "react";

const HeavyComponent = lazy(() => import("./HeavyComponent"));

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HeavyComponent />
        </Suspense>
    );
}
```

## Event Handling

```jsx
function Button() {
    const handleClick = (e) => {
        e.preventDefault();
        console.log("Clicked");
    };
    
    return (
        <>
            <button onClick={handleClick}>Click me</button>
            
            {/* Event delegation */}
            <div onClick={handleClick}>
                <p>Click anywhere</p>
            </div>
        </>
    );
}
```

## Common Interview Questions

1. **What is the Virtual DOM and why is it important?**
   - In-memory representation of actual DOM
   - React compares new Virtual DOM with previous one (diffing)
   - Only updates actual DOM elements that changed
   - Improves performance by reducing direct DOM manipulations

2. **Explain the lifecycle of a functional component**
   - Mount: useEffect with empty dependency array
   - Update: useEffect with dependency array
   - Unmount: Return cleanup function from useEffect

3. **What is the difference between controlled and uncontrolled components?**
   - Controlled: Form data controlled by React state
   - Uncontrolled: Form data handled by DOM, accessed via ref

4. **How do you prevent unnecessary re-renders?**
   - React.memo for child components
   - useCallback for functions
   - useMemo for expensive computations
   - Proper key usage in lists

5. **What are the common performance issues in React?**
   - Too frequent state updates
   - Large lists without virtualization
   - Unnecessary re-renders
   - Large bundle size

6. **How do you handle state in a large application?**
   - Context API for global state
   - Redux or Zustand for complex state management
   - Separate state logic into custom hooks

7. **Explain how useEffect cleanup works**
   - Cleanup function runs before next effect or unmount
   - Useful for unsubscribing, clearing timers

8. **What is prop drilling and how do you solve it?**
   - Passing props through many intermediate components
   - Solutions: Context API, state management libraries (Redux)

9. **How do you handle asynchronous operations in React?**
   - useEffect for API calls
   - async/await inside effect
   - Handle loading and error states

10. **What is the purpose of keys in lists?**
    - Help React identify which items changed
    - Maintain component state across renders
    - Never use index as key
