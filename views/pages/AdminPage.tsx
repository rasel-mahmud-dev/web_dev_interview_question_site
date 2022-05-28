import React from 'preact/compat';

const AdminPage = (props) => {
  
  function handleResetLocalStorage(){
    localStorage.removeItem("sidebar_data")
    localStorage.removeItem("posts")
  }
  
  return (
    <div>
      <h1>Hello Admin</h1>
      
      <button className="btn btn-primary" onClick={handleResetLocalStorage}>Reset LocalStorage</button>
      
    </div>
  );
};

export default AdminPage;