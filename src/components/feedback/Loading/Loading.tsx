import { Tloading } from "@customtypes"

interface LoadingProps {
  status: Tloading;
  error: null | string;
  children: React.ReactNode; // array | jsx | anything
  // children: React.JSX.Element; // send components only
}

export default function Loading( { status , error, children }: LoadingProps ) {
  if(status === 'pending'){
    return <p>Loading..</p>
  }
  if(status === 'failed'){
    return <p>{error}</p>
  }
  return <>{children}</>;

}
