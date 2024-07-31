import Marketing from "./components/Marketing"
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <motion.div 
      className="flex my-auto" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Marketing />
    </motion.div>
  )
}

export default LandingPage