export const Footer: React.FC = () => {

  const footerItems = [
    ["About", "Professional Community Policies", "Privacy & Terms", "Sales Solutions", "Safety Center"],
    ["Accessibility", "Careers", "Ad Choices", "Mobile"],
    ["Talent Solutions", "Marketing Solutions", "Advertising", "Small Business"],
  ];


  return (
    <footer className="px-6 w-full lg:max-w-[70%] mt-4 mx-auto">
      <div className="container mx-auto grid grid-cols-4 items-center gap-6">
        {footerItems.slice(0, 3).map((column, index) => (
          <ul key={index} className="space-y-2">
            {column.map((item, i) => (
              <li key={i} className="hover:underline text-[12px] w-fit text-[#666] cursor-pointer">{item}</li>
            ))}
          </ul>
        ))}
      </div>
      <p className="text-left text-[#666] mt-6 text-xs">LinkedIn Corporation &copy; 2025</p>
    </footer>
  );
}