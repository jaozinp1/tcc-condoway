import React from "react";
import styles from "./Dashboard.module.css";
import { FiUsers, FiLogIn, FiChevronDown } from "react-icons/fi";

// Função para formatar a data
const formatarData = (data) => {
  if (!data) return null;
  return new Date(data).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
  });
};

// Item da lista de notificação (Visitantes Ativos)
const NotificationItem = ({ item }) => {
  const statusText = { 'Aguardando': 'Aguardando Entrada', 'Entrou': 'Presente no Condomínio' };
  const statusClass = { 'Aguardando': styles.statusAguardando, 'Entrou': styles.statusEntrou };

  return (
    <div className={styles.notificationItem}>
      <span className={`${styles.statusDot} ${statusClass[item.vst_status] || ''}`}></span>
      <div className={styles.notificationContent}>
        <p className={styles.notificationTitle}>{item.vst_nome}</p>
        <div className={styles.details}>
          <span className={`${styles.statusTag} ${statusClass[item.vst_status] || ''}`}>
            {statusText[item.vst_status] || item.vst_status}
          </span>
          {item.vst_data_entrada && (
            <div className={styles.detailItem}><FiLogIn /> Entrada: {formatarData(item.vst_data_entrada)}</div>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente principal do card
export default function RecentOccurrences({
  notifications,
  isExpanded,
  onExpand
}) {
  const visibleNotifications = isExpanded ? notifications : notifications.slice(0, 4);
  const hasMoreNotifications = notifications.length > 4 && !isExpanded;

  return (
    <div className={styles.card}>
      <div className={styles.notificationHeader}>
        <FiUsers />
        <span>VISITANTES RECENTES</span>
        <span className={styles.notificationCount}>{notifications.length}</span>
      </div>

      {visibleNotifications.length > 0
        ? visibleNotifications.map(item => <NotificationItem key={item.vst_id} item={item} />)
        : <p className={styles.emptyState}>Nenhum visitante aguardando ou presente.</p>
      }

      {/* Botão de Ação para expandir */}
      {hasMoreNotifications && (
        <div className={styles.cardFooter}>
          <button onClick={onExpand} className={styles.expandButton}>
            Ver mais <FiChevronDown />
          </button>
        </div>
      )}
    </div>
  );
}