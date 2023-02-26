import Image from "next/image";
import { IHomePageData } from "../../../pages";
import Translate from "../../../inc/locale/Translate";
interface IProps {
    content: IHomePageData['create_content']
}
const CreateContentBlock = ({ content }: IProps): JSX.Element => {
    const { title, button_lesson, button_method, button_course, button_instruction, button_docs, button_all } = content;


    const icon_text = "Text"
    const icon_list = "List"
    const icon_file = "File"
    const icon_picture = "Picture"
    
    return <div className="container-fluid create_content_block">
        <div className="row">
            <div className="col text-center  ">
                <h1 className="create_content_block__header"><Translate string={title} /></h1>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-7 col-lg-8  create_content_block__navigation">
                <div><Translate string={button_lesson} /></div>
                <div><Translate string={button_method} /></div>
                <div><Translate string={button_course} /></div>
                <div><Translate string={button_instruction} /></div>
                <div><Translate string={button_docs} /></div>
                <div className="underline"><Translate string={button_all} /></div>
            </div>
        </div>
        <div className="row">
            <div className="col create_content_block__format">
                <div className="create_content_block__format_item">
                    <div className="circle_pink">
                        <Image src='/images/icons/file_with_text.svg'
                            width={28}
                            height={34}
                            alt='file with text'
                            className={'icon'} />

                    </div>
                    <span><Translate string={icon_text} /></span>
                </div>
                <div className="create_content_block__format_item">
                    <div className="circle_purple">
                        <Image src='/images/icons/check_mark.svg'
                            width={28}
                            height={34}
                            alt='check mark'
                            className={'icon'} />
                    </div>
                    <span><Translate string={icon_list} /></span>
                </div>
                <div className="create_content_block__format_item">
                    <div className="circle_green">
                        <Image src='/images/icons/file.svg'
                            width={28}
                            height={34}
                            alt='file'
                            className={'icon'} />
                    </div>
                    <span><Translate string={icon_file} /></span>
                </div>
                <div className="create_content_block__format_item">
                    <div className="circle_blue">
                        <Image src='/images/icons/pictures.svg'
                            width={31}
                            height={29}
                            alt='pictures'
                            className={'icon'} />
                    </div>
                    <span><Translate string={icon_picture} /></span>
                </div>

            </div>
        </div>
    </div>;
};

export default CreateContentBlock;
