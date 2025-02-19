
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    orixa: "",
    birthday: "",
    baptismDate: "",
    fronts: "",
    umbandaObligations: "",
    santoObligations: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle profile update
  };

  return (
    <Layout>
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="photo">Foto</Label>
              <Input id="photo" type="file" accept="image/*" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="orixa">Orixá</Label>
              <Input
                id="orixa"
                value={profile.orixa}
                onChange={(e) =>
                  setProfile({ ...profile, orixa: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthday">Aniversário</Label>
              <Input
                id="birthday"
                type="date"
                value={profile.birthday}
                onChange={(e) =>
                  setProfile({ ...profile, birthday: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="baptismDate">Data de Batizado</Label>
              <Input
                id="baptismDate"
                type="date"
                value={profile.baptismDate}
                onChange={(e) =>
                  setProfile({ ...profile, baptismDate: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fronts">Frentes Apresentadas</Label>
              <Input
                id="fronts"
                value={profile.fronts}
                onChange={(e) =>
                  setProfile({ ...profile, fronts: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="umbandaObligations">
                Obrigações de Umbanda Feitas
              </Label>
              <Input
                id="umbandaObligations"
                value={profile.umbandaObligations}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    umbandaObligations: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="santoObligations">Obrigação de Santo</Label>
              <Input
                id="santoObligations"
                value={profile.santoObligations}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    santoObligations: e.target.value,
                  })
                }
              />
            </div>

            <Button type="submit" className="w-full">
              Salvar
            </Button>
          </form>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Profile;
