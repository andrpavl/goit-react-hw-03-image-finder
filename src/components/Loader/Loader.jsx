import { MutatingDots } from 'react-loader-spinner';

function Loader() {
  return (
    <MutatingDots
      height="100"
      width="100"
      color="#303f9f"
      secondaryColor="#303f9f"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
}

export default Loader;
