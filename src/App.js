import { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './views/Home/Home';
import GetView from './views/GetView';
import DetailView from './views/DetailView';

import './styles.scss';

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <div className={`app ${toggled ? 'toggled' : ''}`}>
      <Sidebar
        image={image}
        collapsed={collapsed}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
      />
      <main>
        <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
          <FaBars />
        </div>
        <Switch>
          <Route path="/getview" component={GetView} />
          <Route path="/detailview" component={DetailView} />
          <Route path="/" component={Home} />

          <Redirect to="/not-found" />
        </Switch>
        <Footer />
      </main>
    </div>
  );
}

export default App;
