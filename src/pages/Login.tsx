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
import { toast } from "sonner";

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
      toast.success(`Selamat datang ${userData.nama}`);
    }, 500);
  };

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* text left */}
      <div className="flex flex-col items-center justify-center p-8 bg-zinc-100 dark:bg-zinc-800 dark:text-white">
        <h1 className="mb-2 text-4xl font-bold">Selamat Datang!</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Silakan masuk dengan akun Anda untuk melanjutkan.
        </p>
      </div>

      {/* form right */}
      <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-zinc-900">
        <h1 className="text-xl font-bold dark:text-white">Masuk</h1>
        <p className="text-sm text-zinc-400 dark:text-zinc-300">
          Gunakan akun Anda untuk masuk.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-sm mt-6 space-y-4"
          >
            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="dark:text-white">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your@email.com"
                      required
                      {...field}
                      className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                    />
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
                  <FormLabel className="dark:text-white">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="* * * *"
                      required
                      {...field}
                      className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                    />
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
    </div>
  );
}
