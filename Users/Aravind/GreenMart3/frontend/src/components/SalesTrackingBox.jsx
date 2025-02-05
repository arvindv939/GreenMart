
import { useNavigate } from 'react-router-dom';
import './Box.css';

const SalesTrackingBox = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/sales-tracking"); // Navigate to the specific page
  };

  return (
    <div className="box" onClick={handleClick}>
      <h3>Sales Tracking</h3>
      <p>Track your sales data.</p>
    </div>
  );
};

export default SalesTrackingBox;
