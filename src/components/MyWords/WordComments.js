/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Avatar from "../../assets/Icons/Avatar";
import stringToColor from "../../assets/functions/stringToColor";
import styles from "./style.module.css";
import Like from "../../assets/Icons/like";
import Dislike from "../../assets/Icons/dislike";
import LikePlus from "../../assets/Icons/like-plus";
import View from "../../assets/Icons/view";
import Reply from "../../assets/Icons/reply";

const comments = [
    {
        user_id: "lu0000",
        user_name: "Fozil Usanov",
        comment:
            "Officia non ullamco exercitation pariatur quis amet. Ad ad nulla consequat do in officia. Eu elit deserunt commodo eu laboris non tempor dolor aliquip cillum qui esse ex occaecat. Ea esse laboris incididunt veniam occaecat aliqua dolor excepteur ad.",
        date: new Date(),

        like: 2,
        classable: true,
    },
    {
        user_id: "lu0001",
        user_name: "Tolib To'raxonov",
        comment:
            "Cillum sit mollit eu Lorem elit incididunt sint veniam deserunt id. Deserunt id velit sunt irure eiusmod et quis deserunt ipsum mollit veniam laboris labore aliqua. Magna minim voluptate in est ex adipisicing esse in aliqua adipisicing ad adipisicing ut incididunt. In proident id deserunt tempor culpa quis eu enim eiusmod culpa fugiat aliqua do.",
        date: new Date(),

        like: 2,
        classable: true,
    },
    {
        user_id: "lu0002",
        user_name: "Mutal Burhonov",
        comment:
            "Aute laborum ex ut est sit. Commodo nisi et aute fugiat commodo in eiusmod magna voluptate magna velit magna. Consequat Lorem ex nisi ex ut minim dolor ut velit Lorem elit tempor culpa. Aliqua labore irure cillum ad elit deserunt ullamco excepteur anim sunt. In nostrud deserunt culpa mollit et sint reprehenderit exercitation sit. Enim cupidatat est eu id consectetur excepteur cupidatat commodo. Ex dolor ad et est.",
        date: new Date(),

        like: 2,
        classable: true,
    },
    {
        user_id: "lu0000",
        user_name: "Fozil Usanov",
        comment:
            "Sint aliquip ea quis mollit incididunt. Nostrud consectetur ut velit qui est officia laboris mollit Lorem in Lorem culpa. Anim anim ad eu est adipisicing adipisicing ipsum duis minim nostrud culpa.",
        date: new Date(),

        like: 2,
        classable: true,
    },
    {
        user_id: "lu0000",
        user_name: "Fozil Usanov",
        comment:
            "Aliquip officia est adipisicing ea anim ea duis nostrud. Qui dolor velit incididunt sint fugiat. Cillum labore exercitation velit Lorem aliqua Lorem dolor velit pariatur labore. Nisi dolor labore non tempor do culpa tempor exercitation voluptate duis commodo deserunt anim. Et enim commodo aliquip aute.",
        date: new Date(),

        like: 2,
        classable: true,
    },
    {
        user_id: "lu0004",
        user_name: "Yahyo Usanov",
        comment:
            "Laborum consequat ullamco aliquip aute minim laborum aliquip Lorem elit tempor eiusmod laborum. Laborum magna aliqua tempor labore. Quis reprehenderit mollit in ex aliquip sit consequat incididunt consequat deserunt. Ipsum Lorem officia officia est enim velit nostrud ex occaecat nostrud dolore culpa in fugiat. In proident nulla magna nostrud et velit reprehenderit. Excepteur Lorem magna exercitation mollit commodo elit do non nulla deserunt nulla irure aliqua.",
        date: new Date(),

        like: 2,
        classable: true,
    },
    {
        user_id: "lu0002",
        user_name: "Mutal Burhonov",
        comment:
            "Duis in esse anim duis aliquip amet cupidatat proident labore elit tempor dolor. Magna excepteur ut in elit sunt nostrud et nostrud ea et pariatur minim ullamco id. Ullamco nostrud laborum ad in commodo nulla qui ullamco sit dolore aliqua minim.",
        date: new Date(),

        like: 2,
        classable: true,
    },
];

export default function WordComments({ word }) {
    return (
        <div className="w-full flex justify-center my-5 px-2">
            <div className="max-w-7xl w-full">
                <h1 className="text-3xl text-slate-800 font-bold dark:text-white my-2">Comments</h1>
                <div>
                    {comments.map((comment, index) => (
                        <div key={index} className="my-4 cursor-pointer grid grid-cols-[42px_1fr] grid-rows-[42px_1fr] gap-2">
                            {/* Agar rasm bo'masa */}
                            <div className={styles.icon} style={{ backgroundColor: stringToColor(comment?.user_id, 0.35) }}>
                                <Avatar color={"rgba(0, 0, 0, 0.4)"} />
                            </div>
                            <div className="row-span-2">
                                <h1 className="text-xl text-slate-800 font-bold dark:text-white break-words max-w-[100%]">{comment.user_name}</h1>
                                <div>{comment.comment}</div>
                                <div className="flex gap-6">
                                    <div className="flex items-center gap-1">
                                        <LikePlus />
                                        <span></span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Dislike />
                                        <span>&nbsp;</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Reply />
                                        <span></span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span>reply</span>
                                    </div>
                                    {/* <div className="flex items-center gap-1">
                                        <View />1
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div></div>
                </div>
            </div>
        </div>
    );
}
