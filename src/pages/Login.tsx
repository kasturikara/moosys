import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/auth";
import { useStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Login() {
  const { setUser } = useStore();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    const { data: userData, error } = await supabase
      .from("users")
      .select("id, nama, email, password, role")
      .eq("email", data.email)
      .single();

    if (error || !userData) {
      form.setError("email", { message: "User tidak ditemukan" });
      return;
    }

    const isPassValid = bcrypt.compareSync(data.password, userData.password);
    if (!isPassValid) {
      form.setError("password", { message: "Password salah" });
      return;
    }

    localStorage.setItem("user", JSON.stringify(userData));

    setUser({
      id: userData.id,
      nama: userData.nama,
      email: userData.email,
      role: userData.role,
    });

    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 500);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* button submit */}
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            {form.formState.isSubmitting ? "Loading..." : "Login"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
