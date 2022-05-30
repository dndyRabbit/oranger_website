import ReactLoading from "react-loading";

export const LoadingFullscreen = () => {
  return (
    <div className="w-screen h-screen bg-black opacity-80 absolute flex items-center justify-center">
      <ReactLoading type={"cylon"} color={"#ffa500"} height={200} width={200} />
    </div>
  );
};

export const LoadingComponent = () => {
  return (
    <div
      className={`bg-transparent flex items-center justify-center w-full max-w-5xl h-[300px]`}
    >
      <ReactLoading type={"cylon"} color={"#ffa500"} height={150} width={150} />
    </div>
  );
};

export const LoadingSmall = () => {
  return (
    <ReactLoading type={"cylon"} color={"#ffa500"} height={30} width={30} />
  );
};
