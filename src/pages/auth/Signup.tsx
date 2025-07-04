import { Form, Link } from "react-router";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Signup = () => {
  return (
    <Card className="max-w-md mx-auto mt-10 p-6">
      <CardHeader>
        <h1 className="text-2xl font-bold">Signup</h1>
      </CardHeader>
      <CardContent>
        <Form method="POST">
          <div className="mb-4">
            <Label className="mb-2" htmlFor="email">Email</Label>
            <Input type="email" id="email" name="email" required />
          </div>
          <div className="mb-4">
            <Label className="mb-2" htmlFor="password">Password</Label>
            <Input type="password" id="password" name="password" required />
          </div>
          <div className="flex items-center gap-4">
            <Button type="submit">Signup</Button>
            <Button type="button" asChild variant="link">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Signup;