const UserAvatar = ({ name }) => (
  <div className="relative w-24 h-24 mx-auto">
    <div
      className="absolute inset-0 bg-gradient-to-br from-primary/50 via-primary-light to-accent-info
                      rounded-full animate-gradient-xy"
    ></div>
    <div
      className="absolute inset-0.5 bg-card dark:bg-card-dark rounded-full 
                      flex items-center justify-center"
    >
      <span className="text-3xl font-bold text-text-light dark:text-primary-dark">
        {name.charAt(0).toUpperCase()}
      </span>
    </div>
  </div>
);
export default UserAvatar;
