import * as React from "react";

const BottomContent: React.FC = () => {
  return (
    <div className={"px-3 pb-3"}>
      <div className={"w-full p-3 shadow-md rounded-md bg-white"}>
        <div className={"text-2xl font-bold"}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam
          mollitia eius corporis debitis fuga illo possimus fugiat quam odit
          vitae.
        </div>
        <div className={"flex justify-center my-5"}>
          <img src="/images/img1.svg" alt="vector image" width={500} />
        </div>
        <p className="text-gray-800">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
          pariatur unde debitis temporibus odit, dolorum et iusto? Tempore
          eveniet asperiores architecto obcaecati autem magni voluptas
          voluptatum, sunt quisquam facilis iste fugiat quidem odio laudantium
          repellendus deleniti ipsum soluta excepturi nihil possimus, earum,
          quasi illo nostrum natus. Dolorum ipsum rerum .
        </p>
        <div className={"bg-purple-100 text-purple-800 p-3  rounded-md my-5"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          doloribus corporis provident veniam architecto, beatae eligendi enim
          velit a voluptatibus, sequi itaque excepturi repellat similique
          consequuntur iusto vero perspiciatis dicta.
        </div>
        <p className={"text-gray-800"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum culpa
          ratione blanditiis. Repellendus doloribus, pariatur aspernatur
          perspiciatis iste, dignissimos deleniti modi tempore natus qui
          temporibus asperiores voluptates. Sequi, ipsum veritatis.
        </p>
      </div>
    </div>
  );
};

export default BottomContent;
