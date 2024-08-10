import {useState, useEffect, createContext} from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});

function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        async function loadUser(){
            const storageUser = localStorage.getItem('@ticketsPRO');

            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            setLoading(false);
        }
        loadUser();
    }, [])

    //EXECUTAR LOGIN
    async function signIn(email, password){
        /*
        setLoadingAuth(true);

        await signInWithEmailAndPassword(auth, email, password)
        
            .then(async (value)=>{
                let uid = value.user.uid;
                const docRef = doc(db, 'users', uid);
                const docSnap = await getDoc(docRef);

                let data = {
                    uid,
                    name: docSnap.data().name,
                    email: value.user.email,
                    avatarUrl: docSnap.data().avatarUrl
                }

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.success("Bem vindo de volta");
                navigate('/dashboard');
            }).catch((error) => {
                console.log(error);
                setLoadingAuth(false);
                toast.error("Algo de errado não está certo!");
            })
            */
    }
    //CADASTRAR USUÁRIO
    async function signUp(email, password, name){
        /*
        setLoadingAuth(true);

        await createUserWithEmailAndPassword( auth, email, password )
            .then(async (value) => {
                let uid = value.user.uid;
                await setDoc(doc(db, "users", uid), {
                    name: name,
                    avatarUrl: null
                }).then(() => {
                    let data = {
                        uid, 
                        name, 
                        password,
                        email: value.user.email,
                        avatarUrl: null
                    }
                    setUser(data);
                    storageUser(data);                    
                    setLoadingAuth(false);
                    toast.success("Seja bem vindo ao sistema!");
                    navigate('/dashboard');

                }).catch((error)=>{
                    console.log(error + "erro no perfil de usuário");
                    setLoadingAuth(false);
                })
            }).catch((error) => {
                console.log(error);
                setLoadingAuth(false);
            });
            */
    }

    function storageUser(data){
        /*
        localStorage.setItem('@ticketsPRO', JSON.stringify(data))
        */
    }

    async function logout(){
        /*
        await signOut(auth);
        localStorage.removeItem('@ticketsPRO');
        setUser(null);
        */
    }

    return (
        <AuthContext.Provider 
            value={{
                 signed: !!user,
                 user,
                 signUp,
                 signIn, 
                 logout,
                 loadingAuth, 
                 loading,
                 storageUser,
                 setUser
                }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;