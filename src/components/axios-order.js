  import axios from 'axios';

  const instance=axios.create({
      baseURL:"https://react-my-burger-1ea45.firebaseio.com/"
  });

  export default instance;