import * as React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Stack, FormControlLabel, Switch, Alert
} from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';
import { useUsuarioService } from '../../services/usuario.service';
import type { DisplayUser } from './UserTable';

interface EditUserModalProps {
  open: boolean;
  user?: DisplayUser | null;
  onClose: () => void;
  onSaved?: (updated?: any) => void;
}

export default function EditUserModal({ open, user, onClose, onSaved }: EditUserModalProps) {
  const usuarioService = useUsuarioService();

  const [nome, setNome] = React.useState('');
  const [email, setEmail] = React.useState<string | null>('');
  const [ativo, setAtivo] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!user) return;
    setNome(user.nome ?? '');
    setEmail(user.email ?? null);
    setAtivo(user.ativo ?? true);
    setErr(null);
  }, [user, open]);

  const handleSave = async () => {
    if (!user) return;
    setErr(null);
    if (!nome.trim()) {
      setErr('Informe o nome.');
      return;
    }
    setLoading(true);
    try {
      const body: any = {
        id: user.id,
        nome: nome.trim(),
        email: email ?? null,
        ativo: ativo ?? false,
      };
      const resp = await usuarioService.patch?.(body);
      onSaved?.(resp?.data ?? resp);
      onClose();
    } catch (e: any) {
      console.error('erro ao atualizar usuário', e);
      setErr(e?.response?.data?.message ?? 'Falha ao salvar usuário.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Usuário</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          {err && <Alert severity="error">{err}</Alert>}
          <TextField label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} fullWidth />
          <TextField
            label="E-mail"
            value={email ?? ''}
            onChange={(e) => setEmail(e.target.value || null)}
            type="email"
            fullWidth
          />
          <FormControlLabel
            control={<Switch checked={!!ativo} onChange={(_, v) => setAtivo(v)} />}
            label={ativo ? 'Ativo' : 'Inativo'}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          variant="contained"
          endIcon={<CheckIcon />}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
