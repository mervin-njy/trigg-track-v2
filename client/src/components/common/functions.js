export default function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

const navigate = useNavigate();
// Navigate back to the shop all page
const navigateToShop = () => {
  navigate("/shop");
};
