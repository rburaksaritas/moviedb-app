import React from "react";

function Junk() {
    const [data, setData] = useState([{}]);
  
    useEffect(() => {
      fetch('/test')
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          console.log(data);
        });
    }, []);
  
    return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element= {<Home />} />
            <Route path="/login" element={<Login />} />
            {/* Add other routes for different pages */}
          </Routes>
          {typeof data.managers === 'undefined' ? (
            <p>Loading</p>
          ) : (
            data.managers.map((manager, i) => <p key={i}>{manager}</p>)
          )}
        </div>
      </Router>
    );
  }

  export default Junk;