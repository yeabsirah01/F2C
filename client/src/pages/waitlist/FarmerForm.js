import { useState } from "react";
import { Button, TextInput, Textarea, FileInput, Loader } from "@mantine/core";
import axiosConfig from "../../axiosConfig";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const FarmerApplicationForm = () => {
  const [nationalIdNumber, setNationalIdNumber] = useState("");
  const [farmingLicenseNumber, setFarmingLicenseNumber] = useState("");
  const [letter, setLetter] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [farmingLicense, setFarmingLicense] = useState("");
  const [nationalIDPhoto, setNationalIDPhoto] = useState("");
  const [farmSamplePhoto, setFarmSamplePhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  // const { token } = useSelector((state) => state.user);
  const handleSubmit = async (event) => {
    console.log(farmingLicense);
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("nationalIdNumber", nationalIdNumber);
    formData.append("farmingLicenseNumber", farmingLicenseNumber);
    formData.append("letter", letter);
    formData.append("profilePicture", profilePicture);
    formData.append("farmSamplePhoto", farmSamplePhoto);
    formData.append("nationalIDPhoto", nationalIDPhoto);
    formData.append("farmingLicense", farmingLicense);

    // console.log(token);
    const token = `Bearer ${localStorage.getItem("cookie")}`;
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: token,
      },
    };
    try {
      await axiosConfig.post("/waitlist", formData, config);
      toast.success("Product created");
      // navigate("/");
    } catch (error) {
      toast.error(
        error?.response?.data?.msg || "Something went wrong",
        "login-error"
      );
    }
    setLoading(false);
  };

  return (
    <form enctype="multipart/form-data" onSubmit={handleSubmit}>
      <TextInput
        label="National ID Number"
        value={nationalIdNumber}
        onChange={(event) => setNationalIdNumber(event.target.value)}
        required
      />
      <TextInput
        label="Farming License Number"
        value={farmingLicenseNumber}
        onChange={(event) => setFarmingLicenseNumber(event.target.value)}
        required
      />
      <Textarea
        label="Letter"
        value={letter}
        onChange={(event) => setLetter(event.target.value)}
        required
      />
      <FileInput
        label="Profile Picture"
        onChange={setProfilePicture}
        required
      />
      <FileInput
        label="Farming License"
        onChange={setFarmingLicense}
        required
      />

      <FileInput
        label="National ID Photo"
        accept="image/*"
        onChange={setNationalIDPhoto}
        required
      />
      <FileInput
        label="Farm Sample Photo"
        accept="image/*"
        onChange={setFarmSamplePhoto}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? <Loader size="xs" /> : "Submit"}
      </Button>
    </form>
  );
};

export default FarmerApplicationForm;
