import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from 'store/authSlice';

// import { NodeJS } from 'timers';


export default function LoginDataPage() {
  const dispatch = useDispatch();

  // const params: Readonly<Params<string>> = useParams();
  const URL = 'http://localhost:8080/users';
  const navigate = useNavigate();
  useEffect(() => {
    const token = new URLSearchParams(document.location.search).get('token') ?? '';
    console.log(token);
    const [accessToken, refreshToken] = token?.split('refresh=');
    console.log('accessToken=', accessToken);
    console.log('refreshToken=', refreshToken);
    axios
      .get(URL, {
        // params: { token: token },
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        if (res.status === 200) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          console.log(res.data);
          dispatch(
            login({
              userId: res.data.data.id,
              nickname: res.data.data.nickname,
              email: res.data.data.email,
              isAdmin: false,
              bootcampId: res.data.data.bootcampId,
            })
          );

          navigate('/');
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  return <div>되고있냐</div>;

}
