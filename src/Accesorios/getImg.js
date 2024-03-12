import logo from '../Bilder/Logo_background.png';
import child from '../Bilder/Barnepass.png';
import grass from '../Bilder/Grass.png';

function getImg(imgName) {
    switch (imgName) {
      case 'default':
        return (
          <div className="default">
            <img src={logo} alt="WinWin Logo"/>
          </div>
        );
      case 'fas fa-child':
      return (
        <div className="gress">
          <img src={child} alt="Gressklipping" />
        </div>
      );
      case 'fas fa-leaf':
        return (
          <div className="gress">
            <img src={grass} alt="Gressklipping" />
          </div>
        );
      case 'Løvrydding':
        return (
          <div className="Løvrydding">
            <img src="https://www.thegrassmaster.com/wp-content/uploads/2019/03/leaf-clean-up1453-1-1024x683.jpg" alt="Løvrydding" />
          </div>
        );
      case 'Snømåking':
      return (
        <div className="Snømåking">
          <img src="https://yardworx.ca/wp-content/uploads/2021/11/snow-removal-calgary-edmonton.jpg" alt="Snømåking" />
        </div>
      );
      case 'Hundelufting':
      return (
        <div className="Hundelufting">
          <img src="https://img.freepik.com/premium-photo/bernese-mountain-dog-great-outdoors_969097-634.jpg" alt="Hundelufting" />
        </div>
      );
    }
  }

export default getImg;