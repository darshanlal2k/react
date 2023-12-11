export default function TabButton({ children }) {
    // instead of using this click event (vanilla javascript ) . 
    // react gives a special attribute called props (onclick)
    // document.querySelector('button').addEventListener('click', () => {
    // })

    function handleClick() {
        console.log("Hello React Events");
    }
    return (
        <li>
            <button onClick={handleClick} >{children}</button>
        </li>
    );
}