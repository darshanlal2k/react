export default function TabButton({ children, onSelect }) {
    // instead of using this click event (vanilla javascript ) . 
    // react gives a special attribute called props (onclick)
    // document.querySelector('button').addEventListener('click', () => {
    // })


    return (
        <li>
            <button onClick={onSelect} >{children}</button>
        </li>
    );
}