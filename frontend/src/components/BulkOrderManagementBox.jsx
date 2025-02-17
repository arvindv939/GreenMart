import { useNavigate } from 'react-router-dom';
import './Box.css';

const BulkOrderManagementBox = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/bulk-order-management"); // Navigate to the specific page
  };

  return (
    <div className="box" onClick={handleClick}>
      <h3>Bulk Order Management</h3>
      <p>Manage bulk orders here.</p>
    </div>
  );
};

export default BulkOrderManagementBox;
