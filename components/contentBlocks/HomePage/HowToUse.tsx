import Image from "next/image";
import Slider from "react-slick";
import { useRef, useState } from "react";
import SliderCard from "./SliderCard";
import PopupFeedback from "../../popup/PopupFeedback";
import { IHomePageData } from "../../../pages";

interface IProps {
    content: IHomePageData['how_to_use']
}

export interface PopUp {
    id?: number | null;
    specialization?: string | null;
    avatar?: any;
    text?: string | null;
    name?: string | null;
}

const HowToUse = ({ content }: IProps): JSX.Element => {
    const sliderRef = useRef<Slider>(null);
    const [popupInfo, setPopupInfo] = useState<PopUp>({
        id: null,
        specialization: null,
        avatar: null,
        text: null,
        name: null
    })

    const { title, slider_card } = content;

    const settings = {
        className: "center",
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [

            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,


                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,


                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const next = () => {
        sliderRef.current && sliderRef.current.slickNext();
    }
    const previous = () => {
        sliderRef.current && sliderRef.current.slickPrev();
    }

    const popInfo = (popupInfo: PopUp) => {
        setPopupInfo(popupInfo)
    }

    return (<div className="container-fluid how_to_use_block">
        <div className="row">
            <div className="col">
                <h1>{title && title}</h1>
            </div>
        </div>

        <div className="slider">
            <Slider {...settings} ref={sliderRef}>

                {slider_card && slider_card.map((item: any) => (
                    <SliderCard info={item} key={item.id} popInfo={popInfo} />

                ))}

            </Slider>
            <PopupFeedback popupInfo={popupInfo} />
            <div className="row">
                <div className="col d-flex justify-content-center slide_btn">
                    <div className="slide_btn__left" onClick={previous}>
                        <Image src='/images/icons/slider_arrow_left.svg'
                            width={9}
                            height={15}
                            alt='arrow left'
                        />
                    </div>
                    <div className="slide_btn__right" onClick={next}>
                        <Image src='/images/icons/slider_arrow_right.svg'
                            width={9}
                            height={15}
                            alt='arrow left'
                        />
                    </div>
                </div>
            </div>

        </div>

    </div>);
};

export default HowToUse;
