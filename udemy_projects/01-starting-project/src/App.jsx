import { CORE_CONCEPTS } from './data.js';
import Header from './Components/Header/Header.jsx';
import CoreConcept from './Components/CoreConcept/CoreConcept.jsx';
import TabButton from './Components/TabButton/TabButton.jsx';

function App() {
  function handleSelect(selectedButton) {
    console.log(selectedButton);
  }
  return (
    <div>
      <Header />
      <main>
        <section id='core-concepts'>
          <h2>Core Concepts</h2>
          <ul>
            <CoreConcept {...CORE_CONCEPTS[0]} />
            <CoreConcept {...CORE_CONCEPTS[1]} />
            <CoreConcept {...CORE_CONCEPTS[2]} />
            <CoreConcept {...CORE_CONCEPTS[3]} />
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton onSelect={() => handleSelect('Components')}>Components</TabButton>
            <TabButton onSelect={() => handleSelect('Jsx')}>Jsx</TabButton>
            <TabButton onSelect={() => handleSelect('Props')}>Props</TabButton>
            <TabButton onSelect={() => handleSelect('State')}>State</TabButton>
            {/* <TabButton label="Components" /> */}
          </menu>
          Dynamic Content
        </section>
      </main>
    </div>
  );
}

export default App;
