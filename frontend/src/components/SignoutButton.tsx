import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";

function SignoutButton() {
  const queryClient = useQueryClient();

  const {showToast} = useAppContext();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async ()=>{
      // invalidate validateToken query
      await queryClient.invalidateQueries('validateToken');
      // show toast
      showToast({message: "Signed out", type: "SUCCESS"});
    },
    onError: ()=>{
      // show toast
      showToast({message: "Sign out failed", type: "ERROR"});
    }
  });

  const handleClick = () => {
    mutation.mutate();
  }
  return (
    <button className="text-blue-600 px-3 font-bold hover:bg-gray-100 bg-white rounded" onClick={handleClick}>Sign Out</button>
  )
}

export default SignoutButton