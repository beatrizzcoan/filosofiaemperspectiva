import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { AuthService } from '../api/auth';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await AuthService.register(name, email, password);

      const loginResponse = await AuthService.login(email, password);
      await login(loginResponse.token);

      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[80vh] p-8">
      <Card className="w-full max-w-md bg-white p-8 shadow-xl border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-serif text-gray-800">Criar Conta</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6 bg-red-50 text-red-900 border-red-200">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-sans text-gray-600">Nome</Label>
              <Input 
                id="name" 
                type="text" 
                placeholder="Como você quer ser chamado?" 
                className="font-sans"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-sans text-gray-600">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="seu@email.com" 
                className="font-sans"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-sans text-gray-600">Senha</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="No mínimo 6 caracteres" 
                className="font-sans"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-verde hover:bg-verde/90 text-white font-sans text-lg py-6"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Criar Jornada'}
            </Button>
          </form>
          <p className="text-center text-gray-600 font-sans mt-6">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-verde hover:underline font-semibold">
              Faça login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
