const ProfileDetailItem = ({ icon: Icon, label, value }) => (
  <div className="space-y-2 group">
    <div className="flex items-center space-x-2 text-muted dark:text-muted-dark">
      <Icon className="h-4 w-4 transition-colors group-hover:text-primary" />
      <span className="text-sm">{label}</span>
    </div>
    <div
      className="font-medium text-foreground dark:text-foreground-dark 
                      bg-background/50 dark:bg-background-dark/50 
                      backdrop-blur-sm
                      px-3 py-2 rounded-md
                      border border-border/50 dark:border-border-dark/50
                      transform transition-all duration-300
                      group-hover:border-primary/50 group-hover:shadow-md"
    >
      {value}
    </div>
  </div>
);
export default ProfileDetailItem;
