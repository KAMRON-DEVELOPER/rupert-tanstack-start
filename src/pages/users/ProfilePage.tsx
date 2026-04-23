import { getRouteApi } from '@tanstack/react-router';

const ProfilePage = () => {
  const user = getRouteApi('/(users)/profile/').useLoaderData();
  return (
    <div>
      <h1>
        full name: {user.firstName} {user.lastName}
      </h1>
      <p>email: {user.email}</p>
      <p>emailVerified: {user.emailVerified}</p>
    </div>
  );
};

export default ProfilePage;
