import Image from "next/image";
import FooterCopyright from "./FooterCopyright";
import FooterInfo from "./FooterInfo";

const iconSocial = [
  { id: 1, name: "Facebook", icon: "/images/icons/Facebook-Negative.svg" },
  { id: 2, name: "Telegram", icon: "/images/icons/Telegram-Negative.svg" },
  { id: 3, name: "Subtract", icon: "/images/icons/Subtract.svg" },
  { id: 4, name: "YouTube", icon: "/images/icons/YouTube-Negative.svg" },
];

const Footer = (): JSX.Element => {
  return (
    <footer>
      <div className="footer ">
        <div className="footer__container">
          <div className="row text-md-start ">
            <div className="col-xs-12 col-lg-3   footer__infoLogo">
              <Image
                priority={true}
                src={"/images/icons/logo-white.svg"}
                height={69}
                width={233}
                alt={"icon"}
              />
              <span className="footer__infoLogo_text">
                Lorem ipsum dolor sit amet, consectetur
              </span>
              <div className="footer__infoLogo_social d-md-flex d-lg-none">
                {iconSocial.map((item) => (
                  <div className="footer__infoLogo_social_img" key={item.id}>
                    <Image
                      className={"footer__infoLogo_social_icon"}
                      priority={true}
                      src={item.icon}
                      height={35}
                      width={35}
                      alt={"icon"}
                    />
                  </div>
                ))}
              </div>
            </div>
            <FooterInfo />
            <div className="footer__infoLogo_social col-xs-12 col-lg-3  d-none d-lg-flex  ">
              {iconSocial.map((item) => (
                <div className="footer__infoLogo_social_img" key={item.id}>
                  <Image
                    className={"footer__infoLogo_social_icon"}
                    priority={true}
                    src={item.icon}
                    height={35}
                    width={35}
                    alt={"icon"}
                  />
                </div>
              ))}
            </div>
          </div>
          <FooterCopyright />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
