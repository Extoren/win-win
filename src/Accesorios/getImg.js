function getImg(imgName) {
    switch (imgName) {
      case 'gress':
        return (
          <div className="gress">
            <img src="https://www.deere.no/assets/images/region-2/products/commercial-mowing/front-rotary-mowers/1600t-wide-area-rotary-mower-r2c010728-hero.jpg" alt="Gressklipping" />
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