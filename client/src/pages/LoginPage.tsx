import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md bg-white p-8 shadow-xl border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-serif text-gray-800">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-sans text-gray-600">Email</Label>
              <Input id="email" type="email" placeholder="seu@email.com" className="font-sans" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-sans text-gray-600">Senha</Label>
              <Input id="password" type="password" placeholder="********" className="font-sans" />
            </div>
            <Button type="submit" className="w-full bg-verde hover:bg-verde/90 text-white font-sans text-lg py-3">
              Entrar
            </Button>
          </form>
          <p className="text-center text-gray-600 font-sans mt-6">
            Não tem uma conta?{' '}
            <Link to="/register" className="text-verde hover:underline">
              Crie uma agora
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;