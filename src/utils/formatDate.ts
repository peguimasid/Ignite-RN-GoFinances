import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface FormatDateProps {
  date: string | number;
  type?: 'long' | 'short';
}

export const formatDate = ({ date, type = 'short' }: FormatDateProps) => {
  if (type === 'long') {
    return Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
    }).format(new Date(date));
  } else {
    return Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(date));
  }
};

export const getMonthAndYear = (date: Date) => {
  return format(date, 'MMMM, yyyy', { locale: ptBR });
};
