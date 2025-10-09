import * as React from 'react';
import {
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { usePessoaService } from '../../services/pessoa.service';
import { useUsuarioService } from '../../services/usuario.service';
import type { IPessoaDTO } from '../../models/pessoa.model';
import type { IUsuarioDTO } from '../../models/usuario.model';

type Painel = 'linkPessoa' | 'novaPessoa' | 'novoUsuario';

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: (novoUsuario?: any) => void;
}

type TipoPessoa = 'F' | 'J';

interface NovaPessoaForm {
  nome: string;
  contato: string;
  email: string;
  tipoPessoa: TipoPessoa;
}

interface NovoUsuarioForm {
  login: string;
  email: string;
}

const labelPessoa = (p?: Partial<IPessoaDTO> | null) => {
  if (!p) return '';
  const nome = (p as any)?.nome ?? (p as any)?.nmPessoa ?? '';
  const email = (p as any)?.email ?? (p as any)?.dsEmail ?? '';
  return email ? `${nome} • ${email}` : `${nome}`;
};

const isOptionEqualById = (a: IPessoaDTO, b: IPessoaDTO) => {
  return (a as any)?.id === (b as any)?.id;
};

export default function AddUserModal({ open, onClose, onSuccess }: AddUserModalProps) {
  const pessoaService = usePessoaService();
  const usuarioService = useUsuarioService();

  const [active, setActive] = React.useState<Painel>('linkPessoa');

  const [pessoas, setPessoas] = React.useState<IPessoaDTO[]>([]);
  const [loadingPessoas, setLoadingPessoas] = React.useState(false);
  const [selectedPessoa, setSelectedPessoa] = React.useState<IPessoaDTO | null>(null);
  const [inputPessoa, setInputPessoa] = React.useState('');
  const [openAuto, setOpenAuto] = React.useState(false);

  const [novaPessoa, setNovaPessoa] = React.useState<NovaPessoaForm>({
    nome: '',
    contato: '',
    email: '',
    tipoPessoa: 'F',
  });
  const [savingPessoa, setSavingPessoa] = React.useState(false);
  const [pessoaOkMsg, setPessoaOkMsg] = React.useState<string | null>(null);
  const [pessoaErrMsg, setPessoaErrMsg] = React.useState<string | null>(null);

  const [novoUsuario, setNovoUsuario] = React.useState<NovoUsuarioForm>({
    login: '',
    email: '',
  });
  const [savingUsuario, setSavingUsuario] = React.useState(false);
  const [usuarioErrMsg, setUsuarioErrMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    let alive = true;
    const fetch = async () => {
      if (!open) return;
      setLoadingPessoas(true);
      try {
        const resp = await pessoaService.findList(null);
        const lista: IPessoaDTO[] = (resp.data as any)?.content ?? resp.data ?? [];
        if (alive) setPessoas(lista);
      } catch (e) {
        console.error('[API] pessoa.findList falhou:', e);
      } finally {
        if (alive) setLoadingPessoas(false);
      }
    };
    fetch();
    return () => {
      alive = false;
    };
  }, [open]);

  React.useEffect(() => {
    let alive = true;

    if (!open || inputPessoa.trim().length < 2) {
      setLoadingPessoas(false);
      return;
    }

    const h = setTimeout(async () => {
      setLoadingPessoas(true);
      try {
        const resp = await pessoaService.findList(null as any);
        const lista: IPessoaDTO[] = (resp.data as any)?.content ?? resp.data ?? [];
        const lower = inputPessoa.toLowerCase();
        const filtrados = lista.filter((p: any) =>
          labelPessoa(p).toLowerCase().includes(lower),
        );
        if (alive) setPessoas(filtrados);
      } catch (e) {
        console.error('[API] pessoa.findList (debounced) falhou:', e);
      } finally {
        if (alive) setLoadingPessoas(false);
      }
    }, 350);

    return () => {
      alive = false;
      clearTimeout(h);
    };
  }, [inputPessoa, open]);

  React.useEffect(() => {
    if (!selectedPessoa) return;
    const nome = (selectedPessoa as any)?.nome ?? (selectedPessoa as any)?.nmPessoa ?? '';
    const email = (selectedPessoa as any)?.email ?? (selectedPessoa as any)?.dsEmail ?? '';
    setNovoUsuario((prev) => ({
      ...prev,
      login: prev.login || nome || '',
      email: prev.email || email || '',
    }));
  }, []);

  const resetAll = () => {
    setActive('linkPessoa');
    setSelectedPessoa(null);
    setInputPessoa('');
    setNovaPessoa({ nome: '', contato: '', email: '', tipoPessoa: 'F' });
    setPessoaOkMsg(null);
    setPessoaErrMsg(null);
    setNovoUsuario({ login: '', email: '' });
    setUsuarioErrMsg(null);
  };

  const handleClose = () => {
    resetAll();
    onClose();
  };

  const handleCriarPessoa = async () => {
    setPessoaErrMsg(null);
    setPessoaOkMsg(null);

    if (!novaPessoa.nome?.trim()) {
      setPessoaErrMsg('Informe o nome.');
      return;
    }
    if (!novaPessoa.email?.trim()) {
      setPessoaErrMsg('Informe o e-mail.');
      return;
    }

    setSavingPessoa(true);
    try {
      const payload = {
        nome: novaPessoa.nome,
        contato: novaPessoa.contato,
        email: novaPessoa.email,
        tipoPessoa: novaPessoa.tipoPessoa,
      };
      const resp = await pessoaService.create(payload as any);
      const criada: IPessoaDTO = resp.data;

      setPessoas((prev) => [criada, ...prev]);
      setSelectedPessoa(criada);
      setPessoaOkMsg('Pessoa criada com sucesso!');
      setActive('linkPessoa');
    } catch (e: any) {
      console.error('[API] pessoa.create falhou:', e);
      setPessoaErrMsg(e?.response?.data?.message ?? 'Falha ao criar a pessoa.');
    } finally {
      setSavingPessoa(false);
    }
  };

  const handleAvancarParaUsuario = () => {
    if (!selectedPessoa) return;
    setActive('novoUsuario');
  };

  const handleCriarUsuario = async () => {
    setUsuarioErrMsg(null);
    if (!selectedPessoa) {
      setUsuarioErrMsg('Selecione uma pessoa antes de criar o usuário.');
      setActive('linkPessoa');
      return;
    }
    if (!novoUsuario.login?.trim()) {
      setUsuarioErrMsg('Informe o login.');
      return;
    }
    if (!novoUsuario.email?.trim()) {
      setUsuarioErrMsg('Informe o e-mail.');
      return;
    }

    setSavingUsuario(true);
    try {
      const body = {
        nome: novoUsuario.login,
        email: novoUsuario.email,
        pessoa_id: selectedPessoa.id,
      };
      const resp = await usuarioService.create(body as IUsuarioDTO);
      const criado = resp.data;

      onSuccess?.(criado);
      handleClose();
    } catch (e: any) {
      console.error('[API] usuario.create falhou:', e);
      setUsuarioErrMsg(e?.response?.data?.message ?? 'Falha ao criar o usuário.');
    } finally {
      setSavingUsuario(false);
    }
  };

  const loading = openAuto && loadingPessoas;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Adicionar Usuário</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <Accordion expanded={active === 'linkPessoa'} onChange={() => setActive('linkPessoa')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 600 }}>1) Vincular a uma PESSOA</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr auto' },
                    columnGap: 1,
                    rowGap: 1,
                    alignItems: 'center',
                  }}
                >
                  <Autocomplete<IPessoaDTO>
                    options={pessoas}
                    value={selectedPessoa}
                    onChange={(_, value) => setSelectedPessoa(value)}
                    inputValue={inputPessoa}
                    onInputChange={(_, v) => setInputPessoa(v)}
                    getOptionLabel={(opt) => labelPessoa(opt)}
                    isOptionEqualToValue={isOptionEqualById}
                    clearOnBlur={false}
                    open={openAuto}
                    onOpen={() => setOpenAuto(true)}
                    onClose={() => setOpenAuto(false)}
                    loading={loading}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Pesquisar pessoa"
                        placeholder="Digite nome ou e-mail"
                        size="small"
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {loading ? <CircularProgress size={18} /> : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                        sx={{ minWidth: 0 }}
                      />
                    )}
                    ListboxProps={{ style: { maxHeight: 280 } }}
                    fullWidth
                  />

                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => setActive('novaPessoa')}
                    sx={{
                      whiteSpace: 'nowrap',
                      height: 40,
                      justifySelf: { xs: 'start', sm: 'end' },
                      flexShrink: 0,
                    }}
                  >
                    Não encontrou? Criar pessoa
                  </Button>
                </Box>

                <Divider />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                  <Button onClick={handleClose}>Cancelar</Button>
                  <Button
                    variant="contained"
                    endIcon={<CheckIcon />}
                    disabled={!selectedPessoa}
                    onClick={handleAvancarParaUsuario}
                  >
                    Prosseguir
                  </Button>
                </Box>
              </Stack>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={active === 'novaPessoa'} onChange={() => setActive('novaPessoa')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 600 }}>2) Criar PESSOA</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                {pessoaOkMsg && <Alert severity="success">{pessoaOkMsg}</Alert>}
                {pessoaErrMsg && <Alert severity="error">{pessoaErrMsg}</Alert>}

                <Box
                  sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr 1.4fr 0.9fr' },
                    alignItems: 'start',
                  }}
                >
                  <TextField
                    label="Nome *"
                    value={novaPessoa.nome}
                    onChange={(e) => setNovaPessoa((p) => ({ ...p, nome: e.target.value }))}
                    fullWidth
                  />

                  <TextField
                    label="Contato"
                    value={novaPessoa.contato}
                    onChange={(e) => setNovaPessoa((p) => ({ ...p, contato: e.target.value }))}
                    fullWidth
                  />

                  <TextField
                    type="email"
                    label="E-mail *"
                    value={novaPessoa.email}
                    onChange={(e) => setNovaPessoa((p) => ({ ...p, email: e.target.value }))}
                    fullWidth
                  />

                  <TextField
                    select
                    label="Tipo de Pessoa"
                    value={novaPessoa.tipoPessoa}
                    onChange={(e) =>
                      setNovaPessoa((p) => ({ ...p, tipoPessoa: e.target.value as TipoPessoa }))
                    }
                    fullWidth
                    sx={{ minWidth: 180 }}
                  >
                    <MenuItem value="PF">Física</MenuItem>
                    <MenuItem value="PJ">Jurídica</MenuItem>
                  </TextField>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button onClick={() => setActive('linkPessoa')}>Voltar</Button>
                  <Button variant="contained" onClick={handleCriarPessoa} disabled={savingPessoa}>
                    {savingPessoa ? 'Salvando...' : 'Criar pessoa'}
                  </Button>
                </Box>
              </Stack>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={active === 'novoUsuario'} onChange={() => setActive('novoUsuario')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 600 }}>3) Criar USUÁRIO</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                {usuarioErrMsg && <Alert severity="error">{usuarioErrMsg}</Alert>}
                <Alert severity="info">
                  Pessoa vinculada: <strong>{labelPessoa(selectedPessoa)}</strong>
                </Alert>

                <Box
                  sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                  }}
                >
                  <TextField
                    label="Login"
                    value={novoUsuario.login}
                    onChange={(e) => setNovoUsuario((u) => ({ ...u, login: e.target.value }))}
                    fullWidth
                    required
                  />

                  <TextField
                    type="email"
                    label="E-mail"
                    value={novoUsuario.email}
                    onChange={(e) => setNovoUsuario((u) => ({ ...u, email: e.target.value }))}
                    fullWidth
                    required
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button onClick={() => setActive('linkPessoa')}>Voltar</Button>
                  <Button variant="contained" onClick={handleCriarUsuario} disabled={savingUsuario}>
                    {savingUsuario ? 'Criando...' : 'Criar usuário'}
                  </Button>
                </Box>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}