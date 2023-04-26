import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import {
  Modal,
  Group,
  Button,
  Text,
  Select,
  ColorSchemeProvider,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

import { useForm, matchesField, hasLength, isEmail } from "@mantine/form";
import { TextInput, PasswordInput, Box, Radio } from "@mantine/core";
import axiosConfig from "../../axiosConfig";
import { toast } from "react-toastify";
import axios from "axios";

import { Form, Input, LoadingOverlay } from "@mantine/core";

const region = [
  { value: "Amhara", label: "Amhara" },
  { value: "Afar", label: "Afar" },
  { value: "Benishangul-Gumuz", label: "Benishangul-Gumuz" },
  { value: "Dire Dawa", label: "Dire Dawa" },
  { value: "Gambela", label: "Gambela" },
  { value: "Harari", label: "Harari" },
  { value: "Oromia", label: "Oromia" },
  { value: "Sidama", label: "Sidama" },
  { value: "Somali", label: "Somali" },
  { value: "SNNP", label: "SNNP" },
  { value: "Tigray", label: "Tigray" },
];

const role = [
  { value: "Farmer", label: "Farmer" },
  { value: "Consumer", label: "Consumer" },
  { value: "Admin", label: "Admin" },
  { value: "CustomerSupport", label: "CustomerSupport" },
  { value: "Transporter", label: "Transporter" },
];

function SignUp({ onClose }) {
  const handleSubmit = async (formData) => {
    try {
      await axiosConfig.post("/auth/register", formData);
      // setAction("login");
      toast.success("User registered successfully", {
        toastId: "register-success",
      });
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Something went wrong", {
        toastId: "register-error",
      });
    }
  };
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(true, {
    onOpen: () => {
      console.log("Opened");
    },
    onClose: () => {
      console.log("Closed");
    },
  });

  const form = useForm({
    // validate: zodResolver(schema),
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      password: "",
      passwordConfirm: "",
      region: "",
      address: "",
      role: "",
      phone: "",
    },
    validate: {
      firstName: hasLength({ min: 2 }, "Name must have 6 or more characters"),
      email: isEmail("Invalid email"),
      password: hasLength(
        { min: 6 },
        "password must have 6 or more characters"
      ),
      confirmPassword: matchesField("password", "Passwords are not the same"),
    },
  });
  // const value = form.values;
  // console.log(value);

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  function handleRegionChange(value) {
    setSelectedRegion(value);
  }
  function handleRoleChange(value) {
    setSelectedRole(value);
  }

  // console.log(form.values);
  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        centered
        c="#8ce99a"
        my="0"
        py="0"
      >
        <LoadingOverlay visible={isLoading} />
        <div c="blue.6" ta="center">
          <h2
            style={{
              color: "red",
              padding: 0,
              margin: 0,
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Create New Account
          </h2>{" "}
        </div>

        <Box size={32} maw={340} mx="auto" position="absolute" left="90">
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <TextInput
              data-autpfocus
              variant="filled"
              withAsterisk
              label="First Name"
              placeholder="Yeabsra"
              {...form.getInputProps("firstName")}
            />

            <TextInput
              data-autpfocus
              variant="filled"
              withAsterisk
              label="Last Name"
              placeholder="Haile"
              {...form.getInputProps("lastName")}
            />
            <Radio.Group
              name="Gender"
              label="gender"
              withAsterisk
              {...form.getInputProps("gender")}
            >
              <Group mt="xxs">
                <Radio value="male" label="Male" />
                <Radio value="female" label="Female" />
              </Group>
            </Radio.Group>
            <TextInput
              data-autpfocus
              variant="filled"
              label="Phone Number"
              placeholder="+251967006433"
              {...form.getInputProps("phone")}
            />

            <TextInput
              data-autpfocus
              variant="filled"
              withAsterisk
              label="Email"
              placeholder="example@mail.com"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              withAsterisk
              variant="filled"
              label="Password"
              placeholder="pass123"
              mt="sm"
              {...form.getInputProps("password")}
            />
            <PasswordInput
              withAsterisk
              variant="filled"
              label="Confirm Password"
              placeholder=""
              mt="sm"
              {...form.getInputProps("confirmPassword")}
            />

            <Select
              data={region}
              label="Select Region"
              placeholder="Select region"
              value={selectedRegion}
              onChange={(value) => handleRegionChange(value)}
              {...form.getInputProps("region")}
            />
            <TextInput
              data-autpfocus
              variant="filled"
              withAsterisk
              label="Address"
              placeholder="gayint/debretabor"
              {...form.getInputProps("address")}
            />

            <Select
              data={role}
              label="Select Role"
              placeholder="Select role"
              value={selectedRole}
              onChange={(value) => handleRoleChange(value)}
              {...form.getInputProps("role")}
            />

            <Group position="right" mt="xl">
              <Button
                variant="outline"
                color="Green"
                size="md"
                type="submit"
                // onClick={handleSubmit}
              >
                Sign Up
              </Button>
            </Group>
          </form>
        </Box>
      </Modal>

      {/* use navigate -1 */}
    </>
  );
}

// ----------------------------------

export default SignUp;
