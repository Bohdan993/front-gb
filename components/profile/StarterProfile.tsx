import React, { FC } from "react";
import Image from "next/image";
import Translate from "../../inc/locale/Translate";


const StarterProfile: FC = () => {
  return (
    <>
      <section className="starterProfile">
        <div className="starterProfile__top blockContent">
            <div className="starterProfile__action-card actionCard actionCardWithImage">
                <div className="actionCard__left">
                    <h2 className="actionCard__title">
                        Готовий заробляти?
                    </h2>
                    <p className="actionCard__description">
                        Створи свій перший контент, щоб почати
                    </p>
                    <div className="customButtonYellowRound desktop-flex" onClick={()=>{}}>
                        <span><Translate string={'Почати'} /></span>
                        <Image
                            src="/images/icons/arrow-up-right.svg"
                            height={10}
                            width={10}
                            alt="icon"
                            style={{
                                stroke: '#282828'
                            }}
                        />
                    </div>
                </div>
                <div className="actionCard__right">
                    <Image
                        priority={true}
                        src={"/images/starter-profile/img-1.png"}
                        layout="fill"
                        alt={"Information"}
                        objectFit="contain"
                        className="stepCard__image"
                    />
                </div>
                <div className="actionCard__mobile mobile">
                    <div className="customButtonYellowRound mobile-flex" onClick={()=>{}}>
                        <span><Translate string={'Почати'} /></span>
                        <Image
                            src="/images/icons/arrow-up-right.svg"
                            height={10}
                            width={10}
                            alt="icon"
                            style={{
                                stroke: '#282828'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="starterProfile__bottom blockContent">
            <div className="starterProfile__action-card actionCard">
                <div className="actionCard__left">
                    <h2 className="actionCard__title">
                        Готовий заробляти?
                    </h2>
                    <p className="actionCard__description">
                        Створи свій перший контент, щоб почати
                    </p>
                </div>
                <div className="actionCard__right">
                    <div className="customButtonYellowRound" onClick={()=>{}}>
                        <span><Translate string={'Почати'} /></span>
                        <Image
                            src="/images/icons/arrow-up-right.svg"
                            height={10}
                            width={10}
                            alt="icon"
                            style={{
                                stroke: '#282828'
                            }}
                        />
                    </div>
                </div>
            </div>
            <ul className="starterProfile__steps">
                <li className="starterProfile__step-card stepCard">
                    <div className="stepCard__left">
                        <Image
                            priority={true}
                            src={"/images/starter-profile/img-2.png"}
                            layout="fill"
                            alt={"Information"}
                            objectFit="contain"
                            className="stepCard__image"
                        />
                    </div>
                    <div className="stepCard__right">
                        <span className="stepCard__count">
                            Крок 1
                        </span>
                        <h3 className="stepCard__title">
                            Додай коротку інформацію про себе
                        </h3>
                    </div>
                </li>
                <li className="starterProfile__step-card stepCard">
                    <div className="stepCard__left">
                        <span className="stepCard__count">
                            Крок 2
                        </span>
                        <h3 className="stepCard__title">
                            Швиденько створи першу одиницю контенту
                        </h3>
                    </div>
                    <div className="stepCard__right">
                        <Image
                        priority={true}
                        src={"/images/starter-profile/img-3.png"}
                        layout="fill"
                        alt={"Information"}
                        objectFit="contain"
                        className="stepCard__image"
                        />
                    </div>
                </li>
                <li className="starterProfile__step-card stepCard">
                    <div className="stepCard__left">
                        <Image
                            priority={true}
                            src={"/images/starter-profile/img-4.png"}
                            layout="fill"
                            alt={"Information"}
                            objectFit="contain"
                            className="stepCard__image"
                        />
                    </div>
                    <div className="stepCard__right">
                        <span className="stepCard__count">
                            Крок 3
                        </span>
                        <h3 className="stepCard__title">
                            Перевір, як її побачить клієнт
                        </h3>
                    </div>
                </li>
                <li className="starterProfile__step-card stepCard">
                    <div className="stepCard__left">
                        <span className="stepCard__count">
                            Крок 4
                        </span>
                        <h3 className="stepCard__title">
                            Поділись посиланням з аудиторією чи клієнтами
                        </h3>
                    </div>
                    <div className="stepCard__right">
                        <Image
                        priority={true}
                        src={"/images/starter-profile/img-5.png"}
                        layout="fill"
                        alt={"Information"}
                        objectFit="contain"
                        className="stepCard__image"
                        />
                    </div>
                </li>
            </ul>
            <div className="starterProfile__button-wrapper">
                <div className="customButtonYellowRound" onClick={()=>{}}>
                    <span><Translate string={'Почати заробляти'} /></span>
                    <Image
                        src="/images/icons/arrow-up-right.svg"
                        height={10}
                        width={10}
                        alt="icon"
                        style={{
                            stroke: '#282828'
                        }}
                    />
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default StarterProfile;
