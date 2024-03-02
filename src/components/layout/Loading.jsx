import loading from "../../img/loading.svg";

import "./Loading.css";

function Loading() {
  return (
    <div className='loader_container'>
      <img className='loader' src={loading} alt="Loading" />
    </div>
  );
}

export default Loading;