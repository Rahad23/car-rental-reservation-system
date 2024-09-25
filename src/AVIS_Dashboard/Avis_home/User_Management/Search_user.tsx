import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
type TSearchCategoryType = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
};
const Search_user: React.FC<TSearchCategoryType> = ({ setSearch, search }) => {
  return (
    <div className="lg:w-[400px] w-[300px] flex items-center gap-x-3">
      <div className="relative w-80">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className=""
        />
        <IoSearchOutline className="absolute top-[27%] font-semibold text-[#2D3A4B] right-[17px] text-xl" />
      </div>
      {search.length > 0 && (
        <RxCross1
          onClick={() => setSearch("")}
          className="text-red-700 text-2xl cursor-pointer"
          title="Clear Search"
        />
      )}
    </div>
  );
};

export default Search_user;
