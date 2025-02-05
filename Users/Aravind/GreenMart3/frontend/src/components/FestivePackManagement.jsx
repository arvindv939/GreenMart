import { useNavigate } from 'react-router-dom';
import './Box.css';

const FestivePackManagementBox = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/festive-pack-management"); // Navigate to the specific page
  };

  return (
    <div className="box" onClick={handleClick}>
      <h3>Festive Pack Management</h3>
      <p>Manage festive packs here.</p>
    </div>
  );
};

export default FestivePackManagementBox;
